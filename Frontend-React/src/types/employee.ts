export interface IPostingLocation {
  city: string;
  state: string;
  officeAddress: string;
}

// Option interfaces for populating dropdowns
export interface IDepartmentOption {
  _id: string;
  departmentName: string;
  code: string;
}

export interface IPayScaleOption {
  _id: string;
  payLevel: string;
  gradePay: number;
}

export interface IEmployeeFormInput {
  // Step 1: Official Identification
  employeeId: string;
  aadhaarNumber: string;
  panNumber?: string;

  // Step 2: Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Transgender' | 'Other';

  // Step 3: Service & Placement Details
  department:string; // Will store selected dropdown ObjectId
  designation: string;
  payScale: string;   // Will store selected dropdown ObjectId
  currentBasicPay: number;
  cadreGroup: 'Group A' | 'Group B' | 'Group C' | 'Group D';
  employmentType: 'Probationary' | 'Permanent' | 'Contractual' | 'Deputation';
  dateOfJoining: string;
  retirementDate: string;

  // Step 4: Posting Location
  currentPostingLocation: IPostingLocation;
}