import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    // Official Identification
    employeeId: {
      type: String,
      required: [true, 'Government Employee ID is required'],
      unique: true,
      trim: true,
      uppercase: true, // e.g., "GOV-2026-8942"
    },
    aadhaarNumber: {
      type: String,
      required: [true, 'Aadhaar / National ID is required'],
      unique: true,
      select: false, // Hidden by default for privacy
    },
    panNumber: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // Personal Details
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { 
      type: String, 
      enum: ['Male', 'Female', 'Transgender', 'Other'], 
      required: true 
    },

    // Service & Placement Details
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    designation: {
      type: String,
      required: true, // e.g., "Under Secretary", "Section Officer", "Assistant Engineer"
    },
    employmentType: {
      type: String,
      enum: ['Permanent', 'Contractual', 'Deputation', 'Probationary'],
      default: 'Probationary',
    },
    payScale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PayScale',
      required: true,
    },
    cadreGroup: {
      type: String,
      enum: ['Group A', 'Group B', 'Group C', 'Group D'],
      required: true,
    },
    
    // Official Status & Posting
    dateOfJoining: { type: Date, required: true },
    retirementDate: { type: Date, required: true },
    currentPostingLocation: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      officeAddress: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['Active', 'Transferred', 'Suspended', 'Retired', 'On Leave'],
      default: 'Active',
    },

    // Reporting Hierarchy
    reportingOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);