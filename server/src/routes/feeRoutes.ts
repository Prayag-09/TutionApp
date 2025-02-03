import express from 'express';
import FeeController from '../controllers/feeController';
import { feeSchema } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateRequest(feeSchema), FeeController.addFee);
router.put('/edit', validateRequest(feeSchema), FeeController.editFee);
router.put('/archive', FeeController.archiveFee);
router.put('/restore', FeeController.restoreFee);

export default router;
