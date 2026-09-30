import express from 'express';
import {getDesignation,createDesignation,getDesignationById} from '../controllers/designationController.js';


const router = express.Router();

router.route('/').post(createDesignation);
router.route('/').get(getDesignation);
router.route('/:id').get(getDesignationById);


export default router;