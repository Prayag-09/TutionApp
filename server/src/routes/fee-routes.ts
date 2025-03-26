import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, authorize } from '../middlewares/auth';
import {
	addFeeController,
	getAllFeesController,
	updateFeeStatusController,
	updateFeeController,
	createFeeRemittanceController,
	fetchAllFeeRemittancesController,
	fetchRemittancesByStudentController,
	fetchRemittanceByIdController,
	deleteFeeRemittanceController,
	deleteFeeController,
	getFeesByStudentController,
} from '../controllers/fee-controller';

const router = express.Router();

/* ---------- Fees ---------- */
// Add a new fee (only principal)
router.post(
	'/add',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addFeeController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all fees (accessible by principal and teacher)
router.get(
	'/',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllFeesController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get fees by student ID (accessible by parent)
router.get(
	'/student/:studentId',
	authenticate,
	authorize(['parent']),
	asyncHandler(async (req: Request, res: Response) => {
		const { studentId } = req.params;
		const response = await getFeesByStudentController(studentId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update fee status (only principal)
router.put(
	'/:feeId/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { feeId } = req.params;
		const { status } = req.body;
		const response = await updateFeeStatusController(feeId, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update fee details (only principal)
router.put(
	'/:feeId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { feeId } = req.params;
		const response = await updateFeeController(feeId, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Delete a fee (only principal)
router.delete(
	'/:feeId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { feeId } = req.params;
		const response = await deleteFeeController(feeId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

/* ---------- Fee Remittance ---------- */
// Create a new fee remittance (accessible by parent)
router.post(
	'/remittance/add',
	authenticate,
	authorize(['parent']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await createFeeRemittanceController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all fee remittances (accessible by principal)
router.get(
	'/remittance',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await fetchAllFeeRemittancesController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get fee remittances by student ID (accessible by principal and parent)
router.get(
	'/remittance/student/:studentId',
	authenticate,
	authorize(['principal', 'parent']),
	asyncHandler(async (req: Request, res: Response) => {
		const { studentId } = req.params;
		const response = await fetchRemittancesByStudentController(studentId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get a single fee remittance by ID (accessible by principal and parent)
router.get(
	'/remittance/:remittanceId',
	authenticate,
	authorize(['principal', 'parent']),
	asyncHandler(async (req: Request, res: Response) => {
		const { remittanceId } = req.params;
		const response = await fetchRemittanceByIdController(remittanceId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Delete a fee remittance (only principal)
router.delete(
	'/remittance/:remittanceId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { remittanceId } = req.params;
		const response = await deleteFeeRemittanceController(remittanceId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

export default router;
