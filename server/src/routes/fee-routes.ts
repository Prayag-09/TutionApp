import express from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { feeValidator, feeRemittanceValidator } from '../validators';
import { Request, Response, NextFunction } from 'express';
import {
	addFeeController,
	getAllFeesController,
	updateFeeStatusController,
	createFeeRemittanceController,
	fetchAllFeeRemittancesController,
	fetchRemittancesByStudentController,
	fetchRemittanceByIdController,
	deleteFeeRemittanceController,
	updateFeeController,
} from '../controllers/fee-controller';

const router = express.Router();

// **Add a new fee (Only Principal can add)**
router.post(
	'/add',
	authenticate,
	authorize(['principal']),
	validate(feeValidator),
	asyncHandler(async (req: Request, res: Response) => {
		const feeData = req.body;
		const newFee = await addFeeController(feeData);
		res.status(201).json({
			success: true,
			message: 'Fee added successfully',
			data: newFee,
		});
	})
);

// **Get all fees (Accessible by Principal, Teacher, or Student)**
router.get(
	'/',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const fees = await getAllFeesController();
		res.status(200).json({ success: true, data: fees });
	})
);

// **Update fee status (Only Principal can update)**
router.put(
	'/:feeId/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { feeId } = req.params;
		const { status } = req.body;
		const updatedFee = await updateFeeStatusController(feeId, status);
		res.status(200).json({
			success: true,
			message: `Fee status updated to ${status}`,
			data: updatedFee,
		});
	})
);

// **Update fee details (Only Principal can update)**
router.put(
	'/:feeId',
	authenticate,
	authorize(['principal']),
	validate(feeValidator),
	asyncHandler(async (req: Request, res: Response) => {
		const { feeId } = req.params;
		const feeData = req.body;
		const updatedFeeResponse = await updateFeeController(feeId, feeData);
		res.status(200).json({
			success: true,
			message: 'Fee updated successfully',
			data: updatedFeeResponse.data,
		});
	})
);

// ──────────────────────────────────────────────────────────────────────────────
// **FEE REMITTANCE ROUTES**
// ──────────────────────────────────────────────────────────────────────────────

// **Create a new fee remittance (Student/Parent can pay fees)**
router.post(
	'/remittance',
	authenticate,
	authorize(['student', 'parent']),
	validate(feeRemittanceValidator),
	asyncHandler(async (req: Request, res: Response) => {
		const remittanceData = req.body;
		const newRemittance = await createFeeRemittanceController(remittanceData);
		res.status(201).json({
			success: true,
			message: 'Fee remittance recorded successfully',
			data: newRemittance,
		});
	})
);

// **Fetch all fee remittances (Only Principal can view all remittances)**
router.get(
	'/remittance',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (_req: Request, res: Response) => {
		const remittances = await fetchAllFeeRemittancesController();
		res.status(200).json({ success: true, data: remittances });
	})
);

// **Fetch fee remittances by Student ID (Student/Parent can view their own payments)**
router.get(
	'/remittance/student/:studentId',
	authenticate,
	authorize(['student', 'parent']),
	asyncHandler(async (req: Request, res: Response) => {
		const { studentId } = req.params;
		const remittances = await fetchRemittancesByStudentController(studentId);
		res.status(200).json({ success: true, data: remittances });
	})
);

// **Fetch a single fee remittance by ID (Principal, Student, Parent can view)**
router.get(
	'/remittance/:remittanceId',
	authenticate,
	authorize(['principal', 'student', 'parent']),
	asyncHandler(async (req: Request, res: Response) => {
		const { remittanceId } = req.params;
		const remittance = await fetchRemittanceByIdController(remittanceId);
		res.status(200).json({ success: true, data: remittance });
	})
);

// **Delete a fee remittance (Only Principal can delete)**
router.delete(
	'/remittance/:remittanceId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { remittanceId } = req.params;
		await deleteFeeRemittanceController(remittanceId);
		res.status(200).json({
			success: true,
			message: 'Fee remittance deleted successfully',
		});
	})
);

export default router;
