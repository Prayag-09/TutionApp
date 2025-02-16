import express from 'express';
import { Request, Response } from 'express';
import {
	registerUser,
	loginUser,
	getCurrentUser,
	// updateUserStatus,
	registerTeacher,
	getAllTeachers,
	getAllStudents,
	getAllParents,
} from '../controllers/user-management-controller';
import { validate } from '../middlewares/validate';
import { authenticate, authorize } from '../middlewares/auth';
import { loginValidator, userValidator } from '../validators/index';

const router = express.Router();

// Register User with validation (No authentication required)
router.post(
	'/register',
	validate(userValidator),
	async (req: Request, res: Response) => {
		try {
			const newUser = await registerUser(
				req.body.email,
				req.body.password,
				req.body.role
			);
			if (newUser) {
				res.status(201).json(newUser);
			} else {
				res.status(500).json({ error: 'Failed to register user' });
			}
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

// Login User with validation (No authentication required)
router.post(
	'/login',
	validate(loginValidator),
	async (req: Request, res: Response) => {
		try {
			const user = await loginUser(req.body);
			if (user) {
				res.status(200).json(user); // Sending full user details with token
			} else {
				res.status(401).json({ error: 'Invalid email or password' });
			}
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

// Get Current User (Requires authentication)
router.get('/me', authenticate, async (req: Request, res: Response) => {
	try {
		const user = await getCurrentUser(req.user!.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

// // Update User Status (Requires authentication, only accessible by Principal)
// router.put(
// 	'/status/:userId',
// 	authenticate,
// 	authorize(['principal']),
// 	async (req: Request, res: Response) => {
// 		try {
// 			const updatedUser = await updateUserStatus(
// 				req.params.userId,
// 				req.body.status
// 			);
// 			if (updatedUser) {
// 				res.status(200).json(updatedUser);
// 			} else {
// 				res.status(400).json({ error: 'Failed to update user status' });
// 			}
// 		} catch (error) {
// 			res.status(500).json({ error: 'Internal server error' });
// 		}
// 	}
// );

// Register Teacher (Only accessible by Principal)
router.post(
	'/register/teacher',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		try {
			const teacher = await registerTeacher(req.body);
			if (teacher) {
				res.status(201).json(teacher);
			} else {
				res.status(400).json({ error: 'Failed to register teacher' });
			}
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

// Get All Teachers (Requires authentication)
router.get('/teachers', authenticate, async (req: Request, res: Response) => {
	try {
		const teachers = await getAllTeachers();
		res.status(200).json(teachers);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Get All Students (Requires authentication)
router.get('/students', authenticate, async (req: Request, res: Response) => {
	try {
		const students = await getAllStudents();
		res.status(200).json(students);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Get All Parents (Requires authentication)
router.get('/parents', authenticate, async (req: Request, res: Response) => {
	try {
		const parents = await getAllParents();
		res.status(200).json(parents);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

export default router;
