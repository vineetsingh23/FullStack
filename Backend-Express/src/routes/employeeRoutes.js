import express from 'express';
import { 
  createEmployee,
  getEmployeeById, 
  getEmployees,
  updateEmployee,
  deleteEmployee } from '../controllers/employeeController.js';

const router = express.Router();

router.route('/')
  .post(createEmployee)
  .get(getEmployees)
  .put(updateEmployee)
  .delete(deleteEmployee)
  

  router.route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);
  

export default router;