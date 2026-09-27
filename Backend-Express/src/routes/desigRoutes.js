import express from 'express';
import {getDesignation} from '../controllers/designationController.js';


const router = express.Router();


router.route('/').get(getDesignation);

export default router;