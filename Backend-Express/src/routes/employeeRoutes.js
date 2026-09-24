import express from 'express';
import { createEmployee, getEmployeeById, getEmployees } from '../controllers/employeeController.js';

const router = express.Router();

router.route('/')
  .post(createEmployee)
  .get(getEmployees)

  router.route('/:id')
  .get(getEmployeeById);

export default router;