import { Request, Response } from 'express';
import {
	registerUserService,
	loginUserService,
	getCurrentUserService,
	registerTeacherService,
	getAllTeachersService,
	getAllStudentsService,
	getAllParentsService,
} from '../services/user-management-service';

/**
 * Register a new user
 */
export const registerUser = async (email, password, role) => {
	return await registerUserService(email, password, role);
};

/**
 * Login user
 */
export const loginUser = async (req: Request, res: Response) => {
	try {
		const user = await loginUserService(req.body);

		if (user) {
			return res.status(200).json(user);
		}
		res.status(401).json({ error: 'Invalid email or password' });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * Get currently logged-in user
 */
export const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const userId = req.user!.id;
		const user = await getCurrentUserService(userId);

		if (user) {
			return res.status(200).json(user);
		}
		res.status(404).json({ error: 'User not found' });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * Register a teacher (Only for principal)
 */
export const registerTeacher = async (req: Request, res: Response) => {
	try {
		const teacher = await registerTeacherService(req.body);

		if (teacher) {
			return res.status(201).json(teacher);
		}
		res.status(400).json({ error: 'Failed to register teacher' });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * Get all teachers
 */
export const getAllTeachers = async (req: Request, res: Response) => {
	try {
		const teachers = await getAllTeachersService();
		res.status(200).json(teachers);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * Get all students
 */
export const getAllStudents = async (req: Request, res: Response) => {
	try {
		const students = await getAllStudentsService();
		res.status(200).json(students);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * Get all parents
 */
export const getAllParents = async (req: Request, res: Response) => {
	try {
		const parents = await getAllParentsService();
		res.status(200).json(parents);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};
