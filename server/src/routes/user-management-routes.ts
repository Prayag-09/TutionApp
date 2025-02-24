import express, { Request, Response } from 'express';
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
} from '../controllers/user-management-controller';
import {
	parentValidator,
	studentValidator,
	teacherValidator,
} from '../validators';

const router = express.Router();

// Utility function for error responses
const handleErrorResponse = (res: Response, error: any, message: string) => {
	console.error(error);
	res.status(error?.statusCode || 500).json({
		success: false,
		error: error?.message || message,
		details: error?.details || [],
	});
};

// Register Teacher
router.post(
	'/register/teacher',
	authenticate,
	authorize(['principal']),
	validate(teacherValidator),
	async (req: Request, res: Response) => {
		try {
			const teacher = await registerTeacher(req.body);
			res.status(201).json({ success: true, data: teacher });
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to register teacher');
		}
	}
);

// Register Parent
router.post(
	'/register/parent',
	authenticate,
	authorize(['principal', 'teacher']),
	validate(parentValidator),
	async (req: Request, res: Response) => {
		try {
			const parent = await registerParent(req.body);
			res.status(201).json({ success: true, data: parent });
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to register parent');
		}
	}
);

// Register Student
router.post(
	'/register/student',
	authenticate,
	authorize(['principal', 'teacher']),
	validate(studentValidator),
	async (req: Request, res: Response) => {
		try {
			const student = await registerStudent(req.body);
			res.status(201).json({ success: true, data: student });
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to register student');
		}
	}
);

// Get All Parents
router.get(
	'/parents',
	authenticate,
	authorize(['principal']),
	async (_req: Request, res: Response) => {
		try {
			const parents = await getAllParents();
			res.status(200).json({ success: true, data: parents });
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to retrieve parents');
		}
	}
);

// Get All Students
router.get(
	'/students',
	authenticate,
	authorize(['principal', 'teacher']),
	async (_req: Request, res: Response) => {
		try {
			const students = await getAllStudents();
			res.status(200).json({ success: true, data: students });
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to retrieve students');
		}
	}
);

// Get All Teachers
router.get(
	'/teachers',
	authenticate,
	authorize(['principal']),
	async (_req: Request, res: Response) => {
		try {
			const teachers = await getAllTeachers();
			res.status(200).json({ success: true, data: teachers });
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to retrieve teachers');
		}
	}
);

// Edit Teacher
router.put(
	'/edit/teacher',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		try {
			const teacherData = req.body;
			const updatedTeacher = await editTeacher(teacherData);
			res.status(200).json({
				success: true,
				message: 'Successfully updated the teacher',
				data: updatedTeacher,
			});
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to update teacher details');
		}
	}
);

// Edit Student
router.put(
	'/edit/student',
	authenticate,
	authorize(['principal', 'teacher']),
	async (req: Request, res: Response) => {
		try {
			const studentData = req.body;
			const updatedStudent = await editStudent(studentData);
			res.status(200).json({
				success: true,
				message: 'Successfully updated the student',
				data: updatedStudent,
			});
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to update student details');
		}
	}
);

// Edit Parent
router.put(
	'/edit/parent',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	async (req: Request, res: Response) => {
		try {
			const parentData = req.body;
			const updatedParent = await editParent(parentData);
			res.status(200).json({
				success: true,
				message: 'Successfully updated the parent',
				data: updatedParent,
			});
		} catch (error) {
			handleErrorResponse(res, error, 'Unable to update parent details');
		}
	}
);

export default router;
