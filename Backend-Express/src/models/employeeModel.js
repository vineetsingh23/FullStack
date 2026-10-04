import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    // Official Identification
    employeeId: {
      type: String,
      required: [true, 'Government Employee ID is required'],
      unique: true,
      trim: true,
      uppercase: true,   // e.g., "GOV-2026-8942"
    },
    aadhaarNumber: {
      type: Number,
      required: [true, 'Aadhaar / National ID is required'],
      unique: true,
      select: false, 
      length: 12, // Hidden by default for privacy
    },
    panNumber: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // Personal Details
    firstName: { type: String, required: true, trim: true, capitalize: true },
    lastName: { type: String, required: true, trim: true ,capitalize: true},
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] 
    },
    phone: { type: Number, required: true, length: 10 },
    dateOfBirth: { type: Date, required: true, format: 'DD-MM-YYYY' },
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
      capitalize: true,
    },
    designation: {
      type: String,
      required: true,
      capitalize: true,
      // required: true, // e.g., "Under Secretary", "Section Officer", "Assistant Engineer"
    },
    employmentType: {
      type: String,
      enum: ['Permanent', 'Contractual', 'Deputation', 'Probationary', 'Direct Recruitment', 'Regular'],
      default: 'Probationary',
    },
    payScale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PayScale',
      required: true,
    },
    currentBasicPay :{
      type:Number,
      required:true,
    },
    cadreGroup: {
      type: String,
      enum: ['Executive', 'Non-Executive'],
      required: true,
    },
    
    // Official Status & Posting
    dateOfJoining: { type: Date, required: true, format: 'DD-MM-YYYY' },
    retirementDate: { type: Date, required: true, format: 'DD-MM-YYYY' },

    status: {
      type: String,
      enum: ['Active', 'Transferred', 'Suspended', 'Retired', 'On Leave'],
      default: 'Active',
    },

    // Reporting Hierarchy
    reportingOfficer: {
      type: String,
      default: null,
      capitalize: true,
    },
  },
  { timestamps: true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true},
   }
);

// Virtual Field: Dynamically calculates salary based on populated PayScale allowances
employeeSchema.virtual('totalMonthlySalary').get(function () {
  // Check if payScale has been populated
  if (!this.payScale || typeof this.payScale !== 'object') {
    return null;
  }

  const basic = this.currentBasicPay || 0;
  const da = (basic * (this.payScale.allowances?.daPercentage || 0)) / 100;
  const hra = (basic * (this.payScale.allowances?.hraPercentage || 0)) / 100;
  const ta = this.payScale.allowances?.taAmount || 0;
  const gradePay = this.payScale.gradePay || 0;

  return basic + da + hra + ta + gradePay;
});

export default mongoose.model('Employee', employeeSchema);