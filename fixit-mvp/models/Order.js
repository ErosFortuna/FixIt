const mongoose = require('mongoose');
const evidenceSchema = new mongoose.Schema({
  kind: { type: String, enum: ['packing', 'return', 'photo'], required: true },
  filename: { type: String, required: true }, originalName: String, mimeType: String,
  size: Number, note: String, recordedAt: { type: Date, default: Date.now },
});
const differenceSchema = new mongoose.Schema({ description: String, packingTimestamp: String, returnTimestamp: String, confidence: String, evidence: String }, { _id: true });
const analysisSchema = new mongoose.Schema({ summary: String, differences: [differenceSchema], limitations: String, provider: String, analyzedAt: Date }, { _id: false });
const orderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true, index: true },
  channel: { type: String, enum: ['TikTok Shop', 'Shopee', 'Khác'], default: 'Khác' },
  product: { type: String, required: true }, sku: String, quantity: { type: Number, default: 1 },
  total: { type: Number, default: 0 }, status: { type: String, default: 'Chờ xác nhận' },
  returnReason: String, evidence: [evidenceSchema], aiAnalysis: analysisSchema,
}, { timestamps: true });
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
