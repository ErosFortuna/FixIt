const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const multer = require('multer');
const uploadDir = path.resolve(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname).slice(0, 12)}`),
});
const upload = multer({ storage, limits: { fileSize: Number(process.env.MAX_VIDEO_MB || 100) * 1024 * 1024 }, fileFilter: (_req, file, cb) => {
  if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) return cb(null, true);
  const error = new Error('Chỉ nhận tệp video hoặc ảnh.'); error.status = 400; cb(error);
} });
module.exports = { uploadDir, upload };
