import express from 'express';
import { createFee, getFees, updateFee } from '../controllers/fee.controller';
import { isAuthenticated, isPrincipal } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { feeSchema } from '../validators';

const router = express.Router();

router.post('/', isAuthenticated, isPrincipal, validate(feeSchema), createFee);
router.get('/', isAuthenticated, getFees);
router.put(
	'/:id',
	isAuthenticated,
	isPrincipal,
	validate(feeSchema),
	updateFee
);

export default router;
