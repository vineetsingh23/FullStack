import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Department from '../models/departmentModel.js';
import Designation from '../models/designationModel.js';
import PayScale from '../models/payScaleModel.js';

dotenv.config();

const initialDepartments = [
  { name: 'Human Resources', code: 'HR' },
  { name: 'Engineering', code: 'ENG' },
  { name: 'Finance & Accounts', code: 'FIN' },
  { name: 'Administration', code: 'ADM' }
];

const initialDesignations = [
  { title: 'Director', hierarchyLevel: 1 },
  { title: 'Department Head', hierarchyLevel: 2 },
  { title: 'Senior Executive', hierarchyLevel: 3 },
  { title: 'Junior Assistant', hierarchyLevel: 4 }
];

const initialPayScales = [
  { level: 'Level 10', minSalary: 56100, maxSalary: 177500 },
  { level: 'Level 8', minSalary: 47600, maxSalary: 151100 },
  { level: 'Level 6', minSalary: 35400, maxSalary: 112400 }
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