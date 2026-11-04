const fs = require('node:fs');
const path = require('node:path');
const { uploadDir } = require('./mediaStorage');

const API_ROOT = 'https://generativelanguage.googleapis.com';
async function readJson(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || `Gemini API error (${response.status})`);
  return body;
}
async function uploadVideo(file, apiKey) {
  const fullPath = path.join(uploadDir, path.basename(file.filename));
  const stat = fs.statSync(fullPath);
  const mimeType = file.mimeType || 'video/mp4';
  const start = await fetch(`${API_ROOT}/upload/v1beta/files?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(stat.size),
      'X-Goog-Upload-Header-Content-Type': mimeType,
    },
    body: JSON.stringify({ file: { display_name: file.originalName || file.filename } }),
  });
  if (!start.ok) await readJson(start);
  const uploadUrl = start.headers.get('x-goog-upload-url');
  if (!uploadUrl) throw new Error('Gemini không trả về URL tải video.');
  const bytes = fs.readFileSync(fullPath);
  const final = await fetch(uploadUrl, {
    method: 'POST',
    headers: { 'X-Goog-Upload-Offset': '0', 'X-Goog-Upload-Command': 'upload, finalize' },
    body: bytes,
  });
  const result = await readJson(final);
  return result.file || result;
}
async function waitUntilReady(file, apiKey) {
  let current = file;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (current.state === 'ACTIVE') return current;
    if (current.state === 'FAILED') throw new Error('Gemini không xử lý được video này.');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch(`${API_ROOT}/v1beta/${current.name}?key=${encodeURIComponent(apiKey)}`);
    current = await readJson(response);
  }
  throw new Error('Video đang được xử lý quá lâu. Hãy thử lại sau.');
}
function parseModelJson(text) {
  const clean = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const first = clean.indexOf('{'); const last = clean.lastIndexOf('}');
  if (first < 0 || last < first) throw new Error('AI trả về kết quả không đúng định dạng. Hãy chạy phân tích lại.');
  return JSON.parse(clean.slice(first, last + 1));
}
async function compareVideos(packingEvidence, returnEvidence) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { const error = new Error('Chưa cấu hình GEMINI_API_KEY trong tệp .env.'); error.status = 503; throw error; }
  const uploaded = [];
  try {
    const packFile = await uploadVideo(packingEvidence, apiKey); uploaded.push(packFile);
    const returnFile = await uploadVideo(returnEvidence, apiKey); uploaded.push(returnFile);
    const [packReady, returnReady] = await Promise.all([waitUntilReady(packFile, apiKey), waitUntilReady(returnFile, apiKey)]);
    const prompt = `Bạn là trợ lý kiểm tra bằng chứng hàng hoàn. Video 1 là video ĐÓNG GÓI TRƯỚC KHI GIAO; video 2 là video MỞ KIỆN HÀNG HOÀN. Chỉ nêu khác biệt quan sát được giữa hai video về sản phẩm, số lượng, tình trạng hư hỏng hoặc bao bì. Không suy đoán ý định, không quy kết lỗi/gian lận. Bỏ qua khác biệt góc quay, ánh sáng, nền và người thao tác. Chỉ trả các khác biệt có bằng chứng nhìn thấy; nếu không chắc hãy ghi confidence thấp và nêu giới hạn. Ghi mốc thời gian gần đúng trong video liên quan. Nếu không thấy khác biệt rõ, trả mảng differences rỗng và giải thích rằng người bán vẫn cần tự xác nhận. Trả JSON thuần theo mẫu: {"summary":"...","differences":[{"description":"...","packing_timestamp":"00:00:00","return_timestamp":"00:00:00","confidence":"low|medium|high","evidence":"Mô tả điều nhìn thấy"}],"limitations":"..."}.`;
    const response = await fetch(`${API_ROOT}/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [
          { text: 'VIDEO 1 — ĐÓNG GÓI TRƯỚC KHI GIAO:' }, { file_data: { mime_type: packReady.mimeType || packingEvidence.mimeType, file_uri: packReady.uri } },
          { text: 'VIDEO 2 — MỞ KIỆN HÀNG HOÀN:' }, { file_data: { mime_type: returnReady.mimeType || returnEvidence.mimeType, file_uri: returnReady.uri } },
          { text: prompt },
        ] }],
        generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
      }),
    });
    const result = await readJson(response);
    const text = result.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('');
    const parsed = parseModelJson(text);
    return {
      summary: String(parsed.summary || '').slice(0, 1000),
      differences: Array.isArray(parsed.differences) ? parsed.differences.slice(0, 20).map((item) => ({
        description: String(item.description || '').slice(0, 1000),
        packingTimestamp: String(item.packing_timestamp || '').slice(0, 30),
        returnTimestamp: String(item.return_timestamp || '').slice(0, 30),
        confidence: ['low', 'medium', 'high'].includes(item.confidence) ? item.confidence : 'low',
        evidence: String(item.evidence || '').slice(0, 1000),
      })).filter((item) => item.description) : [],
      limitations: String(parsed.limitations || '').slice(0, 1000),
      provider: 'Gemini 2.5 Flash', analyzedAt: new Date(),
    };
  } finally {
    await Promise.all(uploaded.map(async (file) => {
      if (!file.name) return;
      try { await fetch(`${API_ROOT}/v1beta/${file.name}?key=${encodeURIComponent(apiKey)}`, { method: 'DELETE' }); } catch {}
    }));
  }
}
module.exports = { compareVideos };
