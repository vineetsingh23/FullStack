
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
  aadhaarNumber: number;
  panNumber?: string;

  // Step 2: Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Transgender' | 'Other';

  // Step 3: Service & Placement Details
  department:string; // Will store selected dropdown ObjectId
  designation: string;
  payScale: string;   // Will store selected dropdown ObjectId
  currentBasicPay: number;
  cadreGroup: 'Executive' | 'Non-Executive';
  employmentType: 'Direct Recruitment' | 'Permanent' | 'Probationary' | 'Regular' | 'Contractual';
  dateOfJoining: Date;
  retirementDate: Date;
  status:string;
  reportingOfficer: string;

}

export type IEmployeeRecord = Omit<
  IEmployeeFormInput,
  | 'aadhaarNumber'
  | 'department'
  | 'payScale'
  | 'dateOfBirth'
  | 'dateOfJoining'
  | 'retirementDate'
  | 'reportingOfficer'
> & {
  department: {
    _id: string;
    departmentName: string;
    ministry: string;
  } | null;
  payScale: {
    _id: string;
    payLevel: string;
    basicPayMin: number;
    basicPayMax: number;
  } | null;
  dateOfBirth: string;
  dateOfJoining: string;
  retirementDate: string;
  currentBasicPay?: number | null;
  reportingOfficer: string | null;
};

export const tableHeaders = [
  'Action',
  'S.No',
  'Employee Id',
  'Employee Name',
  'Designation',
  'Phone Number',
  'Date Of Birth',
  'Gender',
  'Email Id',
  'Department',
  'Pay Scale',
  'Current Basic',
  'Cadre',
  'Employment Type',
  'Date of Joining',
  'Date of Retirement',
  'Employment Status',
  'Reporting Officer Name',

  

]