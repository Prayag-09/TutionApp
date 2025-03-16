import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import {
	registerParent,
	registerStudent,
	registerTeacher,
	getAllParents,
	getAllStudents,
	getAllTeachers,
	editTeacher,
	editStudent,
	editParent,
	updateUserStatusController,
} from '../controllers/user-management-controller';
import {
	parentValidator,
	studentValidator,
	teacherValidator,
} from '../validators';
import { updateUserStatusService } from '../services/user-management-services';

const router = express.Router();

// Register Teacher
router.post(
	'/register/teacher',
	authenticate,
	authorize(['principal']),
	validate(teacherValidator),
	asyncHandler(async (req: Request, res: Response) => {
		const teacher = await registerTeacher(req.body);
		res.status(201).json({ success: true, data: teacher });
	})
);

// Register Parent
router.post(
	'/register/parent',
	authenticate,
	authorize(['principal', 'teacher']),
	validate(parentValidator),
	asyncHandler(async (req: Request, res: Response) => {
		const parent = await registerParent(req.body);
		res.status(201).json({ success: true, data: parent });
	})
);

// Register Student
router.post(
	'/register/student',
	authenticate,
	authorize(['principal', 'teacher']),
	validate(studentValidator),
	asyncHandler(async (req: Request, res: Response) => {
		const student = await registerStudent(req.body);
		res.status(201).json({ success: true, data: student });
	})
);

// Get All Parents
router.get(
	'/parents',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (_req: Request, res: Response) => {
		const parents = await getAllParents();
		res.status(200).json({ success: true, data: parents });
	})
);

// Get All Students
router.get(
	'/students',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const students = await getAllStudents();
		res.status(200).json({ success: true, data: students });
	})
);

// Get All Teachers
router.get(
	'/teachers',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (_req: Request, res: Response) => {
		const teachers = await getAllTeachers();
		res.status(200).json({ success: true, data: teachers });
	})
);

// Edit Teacher
router.put(
	'/edit/teacher',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const updatedTeacher = await editTeacher(req.body);
		res.status(200).json({
			success: true,
			message: 'Successfully updated the teacher',
			data: updatedTeacher,
		});
	})
);

// Edit Student
router.put(
	'/edit/student',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const updatedStudent = await editStudent(req.body);
		res.status(200).json({
			success: true,
			message: 'Successfully updated the student',
			data: updatedStudent,
		});
	})
);

// Edit Parent
router.put(
	'/edit/parent',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const updatedParent = await editParent(req.body);
		res.status(200).json({
			success: true,
			message: 'Successfully updated the parent',
			data: updatedParent,
		});
	})
);

// Update Teacher Status
router.put(
	'/teacher/:id/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const { status } = req.body;

		const updatedTeacher = await updateUserStatusController(
			id,
			'teacher',
			status
		);
		res.status(200).json({
			success: true,
			message: `Teacher successfully marked as ${status}`,
			data: updatedTeacher,
		});
	})
);

// Update Student Status
router.put(
	'/student/:id/status',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const { status } = req.body;

		const updatedStudent = await updateUserStatusController(
			id,
			'student',
			status
		);
		res.status(200).json({
			success: true,
			message: `Student successfully marked as ${status}`,
			data: updatedStudent,
		});
	})
);

// Update Parent Status
router.put(
	'/parent/:id/status',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const { status } = req.body;

		const updatedParent = await updateUserStatusController(
			id,
			'parent',
			status
		);
		res.status(200).json({
			success: true,
			message: `Parent successfully marked as ${status}`,
			data: updatedParent,
		});
	})
);

export default router;

