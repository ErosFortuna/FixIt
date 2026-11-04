const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  reason: { type: String, required: true }, description: String, differences: [String],
  evidenceIds: [mongoose.Schema.Types.ObjectId], status: { type: String, default: 'Bản nháp' },
}, { timestamps: true });
module.exports = mongoose.models.Claim || mongoose.model('Claim', schema);
