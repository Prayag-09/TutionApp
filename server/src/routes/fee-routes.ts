import express from 'express';
import {
	addFee,
	getAllFees,
	updateFeeStatus,
} from '../controllers/fee-controller';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { feeValidator } from '../validators';

const router = express.Router();

// Add a new fee (only principal can add)
router.post(
	'/add',
	authenticate(feeValidator),
	authorize(['principal']),
	validate(feeValidator),
	addFee
);

// Get all fees (accessible by principal, teacher, or student)
router.get(
	'/',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	getAllFees
);

// Update fee status (using feeId as parameter)
router.put(
	'/:feeId/status',
	authenticate,
	authorize(['principal']),
	updateFeeStatus
);

export default router;
