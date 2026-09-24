import Employee from '../models/employeeModel.js';
import PayScale from '../models/payScaleModel.js';
import Department from '../models/departmentModel.js'
import asyncHandler from '../utils/asyncHandler.js';
import {ApiResponse} from '../utils/ApiResponse.js';

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

export const getEmployeeById = asyncHandler(async (req,res)=>{
  const {id} = req.params;
  const employee = await Employee.findById(id)
  .populate('department')
  .populate('payScale')

  if(!employee){
    res.status(404);
    throw new Error('Employee Not found')
  }
    res.status(200).json(new ApiResponse(200, employee, 'Employee details retrieved'));
});


// // Get single employee with calculated monthly salary
// export const getEmployeeById = asyncHandler(async (req, res) => {
//   const employee = await Employee.findById(req.params.id)
//     .populate('department', 'departmentName ministry')
//     .populate('payScale'); // Mongoose populates scale allowances here

//   if (!employee) {
//     res.status(404);
//     throw new Error('Employee not found');
//   }

//   // employee.totalMonthlySalary is automatically included in JSON output
//   res.status(200).json(new ApiResponse(200, employee, 'Employee details retrieved'));
// });


// export const getEmployeeById = async (req, res) => {
//   try {
//     const employees = await Employee.findById(req.)
//       .populate('department', 'departmentName ministry')
//       .populate('payScale', 'payLevel basicPayMin basicPayMax');
//     res.status(200).json({ success: true, data: employees });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };