const fs = require('node:fs');
const path = require('node:path');
const Order = require('../models/Order');
const Claim = require('../models/Claim');
const { uploadDir } = require('../services/mediaStorage');
const { compareVideos } = require('../services/geminiVideoService');
const findOrder = (code) => Order.findOne({ code: String(code || '').trim() });
exports.list = async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  res.json(await Order.find(filter).sort({ createdAt: -1 }).limit(300).lean());
};
exports.create = async (req, res) => {
  const { code, product, channel, sku, quantity, total } = req.body || {};
  if (!code || !product) return res.status(400).json({ error: 'Cần có mã đơn và tên sản phẩm.' });
  res.status(201).json(await Order.create({ code, product, channel, sku, quantity, total }));
};
exports.updateStatus = async (req, res) => {
  const order = await findOrder(req.params.code);
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
  order.status = String(req.body.status || '').slice(0, 60); await order.save(); res.json(order);
};
exports.listEvidence = async (req, res) => {
  const order = await findOrder(req.params.code);
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
  res.json(order.evidence.map((e) => ({ ...e.toObject(), url: `/api/evidence/${e.id}/file` })));
};
exports.uploadEvidence = async (req, res) => {
  const order = await findOrder(req.params.code);
  if (!order) { if (req.file) fs.unlinkSync(req.file.path); return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' }); }
  if (!req.file) return res.status(400).json({ error: 'Chưa chọn tệp.' });
  const kind = ['packing', 'return', 'photo'].includes(req.body.kind) ? req.body.kind : 'packing';
  order.evidence.push({ kind, filename: req.file.filename, originalName: req.file.originalname, mimeType: req.file.mimetype, size: req.file.size, note: req.body.note || '' });
  const evidence = order.evidence.at(-1);
  if (kind === 'packing') order.status = 'Đã đóng gói';
  if (kind === 'return') order.status = 'Đang kiểm tra hàng hoàn';
  await order.save(); res.status(201).json({ ...evidence.toObject(), url: `/api/evidence/${evidence.id}/file` });
};
exports.streamEvidence = async (req, res) => {
  const order = await Order.findOne({ 'evidence._id': req.params.id });
  if (!order) return res.status(404).end();
  const file = order.evidence.id(req.params.id); const fullPath = path.join(uploadDir, path.basename(file.filename));
  if (!fs.existsSync(fullPath)) return res.status(404).end();
  res.type(file.mimeType || 'application/octet-stream').sendFile(fullPath);
};
exports.scanReturn = async (req, res) => {
  const order = await findOrder(req.body.code);
  if (!order) return res.status(404).json({ error: 'Không tìm thấy mã đơn.' });
  order.returnReason = String(req.body.reason || 'Khác'); order.status = 'Đang kiểm tra hàng hoàn'; await order.save();
  res.json({ order, packingEvidence: order.evidence.filter((e) => e.kind === 'packing'), returnEvidence: order.evidence.filter((e) => e.kind === 'return') });
};
exports.createClaim = async (req, res) => {
  const order = await findOrder(req.params.code);
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
  const claim = await Claim.create({ order: order._id, reason: req.body.reason, description: req.body.description, differences: req.body.differences || [], evidenceIds: req.body.evidenceIds || [] });
  order.status = 'Chờ người bán duyệt khiếu nại'; await order.save(); res.status(201).json(claim);
};
exports.listClaims = async (_req, res) => res.json(await Claim.find().populate('order').sort({ createdAt: -1 }).lean());

exports.analyzeReturn = async (req, res) => {
  const order = await findOrder(req.params.code);
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
  const packing = order.evidence.filter((item) => item.kind === 'packing').at(-1);
  const returned = order.evidence.filter((item) => item.kind === 'return').at(-1);
  if (!packing || !returned) return res.status(400).json({ error: 'Cần có video đóng gói và video mở kiện trước khi phân tích.' });
  const analysis = await compareVideos(packing, returned);
  order.aiAnalysis = analysis;
  await order.save();
  res.json({ orderCode: order.code, ...analysis });
};
