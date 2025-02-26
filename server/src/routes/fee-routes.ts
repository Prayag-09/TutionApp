import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { feeValidator } from '../validators';
import {
	addFee,
	getAllFees,
	updateFeeStatus,
} from '../controllers/fee-controller';

const router = express.Router();

// Add a new fee (only principal can add)
router.post(
	'/add',
	authenticate,
	authorize(['principal']),
	validate(feeValidator),
	async (req, res) => {
		try {
			const feeData = req.body;
			const newFee = await addFee(feeData);
			res.status(201).json({
				success: true,
				message: 'Fee added successfully',
				fee: newFee,
			});
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

// Get all fees (accessible by principal, teacher, or student)
router.get(
	'/',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	async (req, res) => {
		try {
			const fees = await getAllFees();
			res.status(200).json({ success: true, fees });
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

// Update fee status (only principal can update)
router.put(
	'/:feeId/status',
	authenticate,
	authorize(['principal']),
	async (req, res) => {
		try {
			const { feeId } = req.params;
			const { status } = req.body;
			const updatedFee = await updateFeeStatus(feeId, status);
			res.status(200).json({
				success: true,
				message: `Fee status updated to ${status}`,
				fee: updatedFee,
			});
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

export default router;
