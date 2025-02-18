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
} from '../controllers/user-management-controller';
import {
	parentValidator,
	studentValidator,
	teacherValidator,
} from '../validators';

const router = express.Router();

/**
 * Register a Parent
 */
router.post(
	'/register/parent',
	authenticate,
	authorize(['principal']),
	validate(parentValidator),
	async (req: Request, res: Response) => {
		try {
			const response = await registerParent(req.body); // Controller feedback (Service will return JSON)
			res.status(201).json(response); // Return service feedback to the router
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

/**
 * Register a Student
 */
router.post(
	'/register/student',
	authenticate,
	authorize(['principal', 'teacher']),
	validate(studentValidator),
	async (req: Request, res: Response) => {
		try {
			const response = await registerStudent(req.body); // Controller feedback (Service will return JSON)
			res.status(201).json(response); // Return service feedback to the router
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

/**
 * Register a Teacher
 */
router.post(
	'/register/teacher',
	authenticate,
	authorize(['principal']),
	validate(teacherValidator),
	async (req: Request, res: Response) => {
		try {
			const response = await registerTeacher(req.body); // Controller feedback (Service will return JSON)
			res.status(201).json(response); // Return service feedback to the router
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

/**
 * Get all Parents
 */
router.get(
	'/parents',
	authenticate,
	authorize(['principal']),
	async (_req, res) => {
		try {
			const parents = await getAllParents(); // Controller feedback (Service will return JSON)
			res.status(200).json(parents); // Return service feedback to the router
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

/**
 * Get all Students
 */
router.get(
	'/students',
	authenticate,
	authorize(['principal', 'teacher']),
	async (_req, res) => {
		try {
			const students = await getAllStudents(); // Controller feedback (Service will return JSON)
			res.status(200).json(students); // Return service feedback to the router
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

/**
 * Get all Teachers
 */
router.get(
	'/teachers',
	authenticate,
	authorize(['principal']),
	async (_req, res) => {
		try {
			const teachers = await getAllTeachers(); // Controller feedback (Service will return JSON)
			res.status(200).json(teachers); // Return service feedback to the router
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

export default router;
