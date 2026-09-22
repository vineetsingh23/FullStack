import express from 'express';

import { createDepartment, getDepartments } from '../controllers/departmentController.js';

const router = express.Router();

router.route('/')
.post(createDepartment)
.get(getDepartments);

export default router;