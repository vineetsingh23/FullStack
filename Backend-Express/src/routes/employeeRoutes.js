import express from 'express';
import { createEmployee, getEmployees } from '../controllers/employeeController.js';

const router = express.Router();

router.route('/')
  .post(createEmployee)
  .get(getEmployees);

export default router;