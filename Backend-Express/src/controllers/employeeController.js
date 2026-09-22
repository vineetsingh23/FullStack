import Employee from '../models/employeeModel.js';
import PayScale from '../models/payScaleModel.js';

// Add a new Government Employee
export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all employees with populated Department and PayScale references
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('department', 'departmentName ministry')
      .populate('payScale', 'payLevel basicPayMin basicPayMax');
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

