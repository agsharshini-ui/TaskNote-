const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
  },
  { timestamps: true }
);

noteSchema.index({ updatedAt: -1 });

module.exports = mongoose.model('Note', noteSchema);
