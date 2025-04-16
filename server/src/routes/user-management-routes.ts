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
	getTeacherById,
	getStudentById,
	getParentById,
	deleteTeacher,
	deleteStudent,
	deleteParent,
	getUserRoles,
	editTeacher,
	editStudent,
	editParent,
	updateUserStatusController,
	updateTeacherController,
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

// Get Parent by ID
router.get(
	'/parents/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const parent = await getParentById(req.params.id);
		res.status(200).json({ success: true, data: parent });
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

// Get Student by ID
router.get(
	'/students/:id',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const student = await getStudentById(req.params.id);
		res.status(200).json({ success: true, data: student });
	})
);

// Get All Teachers
router.get(
	'/teachers',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const teachers = await getAllTeachers();
		res.status(200).json({ success: true, data: teachers });
	})
);

// Get Teacher by ID
router.get(
	'/teachers/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const teacher = await getTeacherById(req.params.id);
		res.status(200).json({ success: true, data: teacher });
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

// Delete Teacher
router.delete(
	'/teachers/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		await deleteTeacher(req.params.id);
		res
			.status(200)
			.json({ success: true, message: 'Teacher deleted successfully' });
	})
);

// Delete Student
router.delete(
	'/students/:id',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		await deleteStudent(req.params.id);
		res
			.status(200)
			.json({ success: true, message: 'Student deleted successfully' });
	})
);

// Delete Parent
router.delete(
	'/parents/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		await deleteParent(req.params.id);
		res
			.status(200)
			.json({ success: true, message: 'Parent deleted successfully' });
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

// Update Teacher
router.put(
	'/teachers/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const teacherId = req.params.id;
		const teacherData = req.body;
		const updatedTeacher = await updateTeacherController(
			teacherId,
			teacherData
		);
		res.status(200).json({
			success: true,
			message: 'Successfully updated the teacher',
			data: updatedTeacher,
		});
	})
);

// Get User Roles
router.get(
	'/roles',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (_req: Request, res: Response) => {
		const roles = await getUserRoles();
		res.status(200).json({ success: true, data: roles });
	})
);

export default router;
