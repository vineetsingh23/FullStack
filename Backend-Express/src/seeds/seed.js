import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Department from '../models/departmentModel.js';
import Designation from '../models/designationModel.js';
import PayScale from '../models/payScaleModel.js';

dotenv.config();

const initialDepartments = [
  { departmentName: 'Human Resources', departmentCode: 'HR',ministry: 'Ministry of Urban Development' },
  { departmentName: 'Engineering', departmentCode: 'ENG',ministry: 'Ministry of Urban Development' },
  { departmentName: 'Finance & Accounts', departmentCode: 'FIN',ministry: 'Ministry of Urban Development' },
  { departmentName: 'Administration', departmentCode: 'ADM',ministry: 'Ministry of Urban Development'}
];

const initialDesignations = [
  { title: 'Managing Director', hierarchyLevel: 10 },
  { title: 'Board of Director', hierarchyLevel: 10 },
  { title: 'General Manager', hierarchyLevel: 9 },
  { title: 'Assistant Manager', hierarchyLevel: 9 },
  { title: 'Senior Supervisor', hierarchyLevel: 8 },
  { title: 'Supervisor', hierarchyLevel: 7 },
  { title: 'Technician', hierarchyLevel: 6 },
];

const initialPayScales = [
  { payLevel: 'Level 10', basicPayMin: 56100, basicPayMax: 177500 },
  { payLevel: 'Level 8', basicPayMin: 47600, basicPayMax: 151100 },
  { payLevel: 'Level 6', basicPayMin: 35400, basicPayMax: 112400 },
  
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing entries to prevent duplicate key errors
    await Department.deleteMany({});
    await Designation.deleteMany({});
    await PayScale.deleteMany({});

    // Bulk insert initial data
    await Department.insertMany(initialDepartments);
    await Designation.insertMany(initialDesignations);
    await PayScale.insertMany(initialPayScales);

    console.log('✅ Database successfully seeded with organizational structure!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();