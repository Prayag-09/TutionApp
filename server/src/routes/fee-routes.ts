import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { feeValidator, feeRemittanceValidator } from '../validators';
import {
	addFeeController,
	getAllFeesController,
	// updateFeeStatusController,
	createFeeRemittanceController,
	fetchAllFeeRemittancesController,
	fetchRemittancesByStudentController,
	fetchRemittanceByIdController,
	deleteFeeRemittanceController,
} from '../controllers/fee-controller';

const router = express.Router();

// **Add a new fee (Only Principal can add)**
router.post(
	'/add',
	authenticate,
	authorize(['principal']),
	validate(feeValidator),
	async (req, res) => {
		try {
			const feeData = req.body;
			const newFee = await addFeeController(feeData);
			res.status(201).json({
				success: true,
				message: 'Fee added successfully',
				data: newFee,
			});
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

// **Get all fees (Accessible by Principal, Teacher, or Student)**
router.get(
	'/',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	async (req, res) => {
		try {
			const fees = await getAllFeesController();
			res.status(200).json({ success: true, data: fees });
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

// // **Update fee status (Only Principal can update)**
// router.put(
// 	'/:feeId/status',
// 	authenticate,
// 	authorize(['principal']),
// 	async (req, res) => {
// 		try {
// 			const { feeId } = req.params;
// 			const { status } = req.body;
// 			const updatedFee = await updateFeeStatusController(feeId, status);
// 			res.status(200).json({
// 				success: true,
// 				message: `Fee status updated to ${status}`,
// 				data: updatedFee,
// 			});
// 		} catch (error: any) {
// 			res.status(500).json({ success: false, error: error.message });
// 		}
// 	}
// );

// ──────────────────────────────────────────────────────────────────────────────
// **FEE REMITTANCE ROUTES**
// ──────────────────────────────────────────────────────────────────────────────

// **Create a new fee remittance (Student/Parent can pay fees)**
router.post(
	'/remittance',
	authenticate,
	authorize(['student', 'parent']),
	validate(feeRemittanceValidator),
	async (req, res) => {
		try {
			const remittanceData = req.body;
			const newRemittance = await createFeeRemittanceController(remittanceData);
			res.status(201).json({
				success: true,
				message: 'Fee remittance recorded successfully',
				data: newRemittance,
			});
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

// **Fetch all fee remittances (Only Principal can view all remittances)**
router.get(
	'/remittance',
	authenticate,
	authorize(['principal']),
	async (req, res) => {
		try {
			const remittances = await fetchAllFeeRemittancesController();
			res.status(200).json({ success: true, data: remittances });
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

// **Fetch fee remittances by Student ID (Student/Parent can view their own payments)**
router.get(
	'/remittance/student/:studentId',
	authenticate,
	authorize(['student', 'parent']),
	async (req, res) => {
		try {
			const { studentId } = req.params;
			const remittances = await fetchRemittancesByStudentController(studentId);
			res.status(200).json({ success: true, data: remittances });
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

// **Fetch a single fee remittance by ID (Principal, Student, Parent can view)**
router.get(
	'/remittance/:remittanceId',
	authenticate,
	authorize(['principal', 'student', 'parent']),
	async (req, res) => {
		try {
			const { remittanceId } = req.params;
			const remittance = await fetchRemittanceByIdController(remittanceId);
			res.status(200).json({ success: true, data: remittance });
		} catch (error: any) {
			res.status(404).json({ success: false, error: error.message });
		}
	}
);

// **Delete a fee remittance (Only Principal can delete)**
router.delete(
	'/remittance/:remittanceId',
	authenticate,
	authorize(['principal']),
	async (req, res) => {
		try {
			const { remittanceId } = req.params;
			await deleteFeeRemittanceController(remittanceId);
			res.status(200).json({
				success: true,
				message: 'Fee remittance deleted successfully',
			});
		} catch (error: any) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

export default router;
