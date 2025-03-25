// report-routes.ts
import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, authorize } from '../middlewares/auth';
import {
	generateUserReport,
	generateTuitionReport,
	generateFeeReport,
	generateAttendanceReport,
} from '../controllers/report-controller';

const router = express.Router();

// Generate user report (accessible by principal)
router.get(
	'/users',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await generateUserReport();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Generate tuition report (accessible by principal and teacher)
router.get(
	'/tuition',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await generateTuitionReport();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Generate fee report (accessible by principal)
router.get(
	'/fees',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await generateFeeReport();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Generate attendance report (accessible by principal and teacher)
router.get(
	'/attendance',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await generateAttendanceReport();
		res.status(response.success ? 200 : 500).json(response);
	})
);

export default router;
