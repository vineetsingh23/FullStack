import express from 'express';
import {getPayScales} from '../controllers/payScaleController.js'


const router = express.Router();


router.route('/').get(getPayScales);

export default router;