import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g., "Ministry of Home Affairs"
    },
    departmentCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // e.g., "MHA"
    },
    ministry: {
      type: String,
      required: true, // e.g., "Ministry of Electronics and IT"
    },
    headOfDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Department', departmentSchema);