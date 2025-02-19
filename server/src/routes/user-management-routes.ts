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


// Register Teacher
router.post(
	'/register/teacher',
	authenticate,
	authorize(['principal']),
	validate(teacherValidator),
	async (req: Request, res: Response) => {
		try {
			const teacherData = {
				teacherName: req.body.teacherName,
				mobileNumber: req.body.mobileNumber,
				email: req.body.email,
				residentialAddress: req.body.residentialAddress,
				qualification: req.body.qualification,
				status: req.body.status,
				gradeSubjects: req.body.gradeSubjects,
				password: req.body.password,
			};
			const teacher = await registerTeacher(teacherData);
			res.status(201).json(teacher);
		} catch (error) {
			res
				.status(500)
				.json({
					error:
						error instanceof Error ? error.message : 'Internal server error',
				});
		}
	}
);

// Register Parent
router.post(
	'/register/parent',
	authenticate,
	authorize(['principal']),
	validate(parentValidator),
	async (req: Request, res: Response) => {
		try {
			const parentData = {
				name: req.body.name,
				mobile: req.body.mobile,
				email: req.body.email,
				residentialAddress: req.body.residentialAddress,
				status: req.body.status,
			};
			const parent = await registerParent(parentData);
			res.status(201).json(parent);
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
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
			const studentData = {
				name: req.body.name,
				mobile: req.body.mobile,
				email: req.body.email,
				residentialAddress: req.body.residentialAddress,
				parentId: req.body.parentId,
				gradeId: req.body.gradeId,
				subjects: req.body.subjects,
				status: req.body.status,
			};
			const student = await registerStudent(studentData);
			res.status(201).json(student);
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

// Get All Parents
router.get(
	'/parents',
	authenticate,
	authorize(['principal']),
	async (_req, res) => {
		try {
			const parents = await getAllParents();
			res.status(200).json(parents);
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

// Get All Students
router.get(
	'/students',
	authenticate,
	authorize(['principal', 'teacher']),
	async (_req, res) => {
		try {
			const students = await getAllStudents();
			res.status(200).json(students);
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

// Get All Teachers
router.get(
	'/teachers',
	authenticate,
	authorize(['principal']),
	async (_req, res) => {
		try {
			const teachers = await getAllTeachers();
			res.status(200).json(teachers);
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

export default router;
