import mongoose from 'mongoose';

const transferHistorySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    previousDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    newDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    transferOrderNumber: {
      type: String,
      required: true, // Official gazette/transfer order reference ID
    },
    effectiveDate: {
      type: Date,
      required: true,
    },
    newLocation: {
      city: String,
      state: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('TransferHistory', transferHistorySchema);