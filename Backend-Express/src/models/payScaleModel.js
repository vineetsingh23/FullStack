import mongoose from 'mongoose';

const payScaleSchema = new mongoose.Schema(
  {
    payLevel: {
      type: String,
      required: true,
      unique: true, // e.g., "Level 10", "Level 11"
    },
    basicPayMin: {
      type: Number,
      required: true, // e.g., 56100
    },
    basicPayMax: {
      type: Number,
      required: true, // e.g., 177500
    },
    gradePay: {
      type: Number,
      default: 0,
    },
    allowances: {
      daPercentage: { type: Number, default: 0 }, // Dearness Allowance %
      hraPercentage: { type: Number, default: 0 }, // House Rent Allowance %
      taAmount: { type: Number, default: 0 },      // Travel Allowance
    },
  },
  { timestamps: true }
);

export default mongoose.model('PayScale', payScaleSchema);