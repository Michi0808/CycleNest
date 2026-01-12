import mongoose from './../db.js';

const cycleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cycleTitle: { type: String, required: true },
    startDate: { type: String, required: true },
    items: [
      {
        title: { type: String, required: true },
        length: { type: Number, required: true },
        start: { type: String, required: true },
        end: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Cycle =
  mongoose.models.Cycle || mongoose.model('Cycle', cycleSchema);
