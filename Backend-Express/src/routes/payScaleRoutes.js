import express from 'express';
import {getPayScales,createPayScale} from '../controllers/payScaleController.js'


const router = express.Router();

router.route('/').post(createPayScale);

router.route('/').get(getPayScales);

export default router;