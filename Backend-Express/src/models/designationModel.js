import mongoose from 'mongoose';

const designationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Designation title is required'],
      unique: true,
      trim: true, // Automatically removes leading/trailing whitespace
    },
    hierarchyLevel: {
      type: Number,
      required: [true, 'Hierarchy level is required'], // Lower number = Higher authority (e.g., 1 for Director, 2 for Manager)
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Designation = mongoose.model('Designation', designationSchema);

export default Designation;