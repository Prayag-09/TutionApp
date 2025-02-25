import express, { Request, Response } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import {
	addGrade,
	getAllGrades,
	updateGradeStatus,
	addGradeSubject,
	getAllGradeSubjects,
	updateGradeSubjectStatus,
	addSubject,
	getAllSubjects,
	updateSubjectStatus,
	addStudentSubject,
	getAllStudentSubjects,
	updateStudentSubjectStatus,
	recordAttendance,
	getAllAttendance,
	updateAttendanceStatus,
} from '../controllers/tution-controller';

const router = express.Router();

/* ---------- Grades ---------- */
// Add a new grade (only principal)
router.post(
	'/grades/add',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		const response = await addGrade(req.body);
		res.status(response.success ? 201 : 500).json(response);
	}
);

// Get all grades (accessible by principal, teacher, or student)
router.get(
	'/grades',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	async (_req: Request, res: Response) => {
		const response = await getAllGrades();
		res.status(response.success ? 200 : 500).json(response);
	}
);

// Update grade status (Live/Archived)
router.put(
	'/grades/:gradeId/status',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		const { gradeId } = req.params;
		const { status } = req.body;
		const response = await updateGradeStatus(gradeId, status);
		res.status(response.success ? 200 : 500).json(response);
	}
);

/* ---------- Grade-Subject ---------- */
// Add a new grade–subject relation (only principal)
router.post(
	'/grade-subject/add',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		const response = await addGradeSubject(req.body);
		res.status(response.success ? 201 : 500).json(response);
	}
);

// Get all grade–subject relations (accessible by principal and teacher)
router.get(
	'/grade-subject',
	authenticate,
	authorize(['principal', 'teacher']),
	async (_req: Request, res: Response) => {
		const response = await getAllGradeSubjects();
		res.status(response.success ? 200 : 500).json(response);
	}
);

// Update grade–subject relation status
router.put(
	'/grade-subject/:gradeSubjectId/status',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		const { gradeSubjectId } = req.params;
		const { status } = req.body;
		const response = await updateGradeSubjectStatus(gradeSubjectId, status);
		res.status(response.success ? 200 : 500).json(response);
	}
);

/* ---------- Subjects ---------- */
// Add a new subject (only principal)
router.post(
	'/subjects/add',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		const response = await addSubject(req.body);
		res.status(response.success ? 201 : 500).json(response);
	}
);

// Get all subjects (accessible by principal, teacher, and student)
router.get(
	'/subjects',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	async (_req: Request, res: Response) => {
		const response = await getAllSubjects();
		res.status(response.success ? 200 : 500).json(response);
	}
);

// Update subject status
router.put(
	'/subjects/:subjectId/status',
	authenticate,
	authorize(['principal']),
	async (req: Request, res: Response) => {
		const { subjectId } = req.params;
		const { status } = req.body;
		const response = await updateSubjectStatus(subjectId, status);
		res.status(response.success ? 200 : 500).json(response);
	}
);

/* ---------- Student-Subject ---------- */
// Add a new student–subject relation (accessible by principal and teacher)
router.post(
	'/student-subject/add',
	authenticate,
	authorize(['principal', 'teacher']),
	async (req: Request, res: Response) => {
		const response = await addStudentSubject(req.body);
		res.status(response.success ? 201 : 500).json(response);
	}
);

// Get all student–subject relations
router.get(
	'/student-subject',
	authenticate,
	authorize(['principal', 'teacher']),
	async (_req: Request, res: Response) => {
		const response = await getAllStudentSubjects();
		res.status(response.success ? 200 : 500).json(response);
	}
);

// Update student–subject relation status
router.put(
	'/student-subject/:studentSubjectId/status',
	authenticate,
	authorize(['principal', 'teacher']),
	async (req: Request, res: Response) => {
		const { studentSubjectId } = req.params;
		const { status } = req.body;
		const response = await updateStudentSubjectStatus(studentSubjectId, status);
		res.status(response.success ? 200 : 500).json(response);
	}
);

/* ---------- Attendance ---------- */
// Record attendance (accessible only by teacher)
router.post(
	'/attendance/add',
	authenticate,
	authorize(['teacher']),
	async (req: Request, res: Response) => {
		const response = await recordAttendance(req.body);
		res.status(response.success ? 201 : 500).json(response);
	}
);

// Get all attendance records (accessible by principal and teacher)
router.get(
	'/attendance',
	authenticate,
	authorize(['principal', 'teacher']),
	async (_req: Request, res: Response) => {
		const response = await getAllAttendance();
		res.status(response.success ? 200 : 500).json(response);
	}
);

// Update attendance status
router.put(
	'/attendance/:attendanceId/status',
	authenticate,
	authorize(['principal', 'teacher']),
	async (req: Request, res: Response) => {
		const { attendanceId } = req.params;
		const { status } = req.body;
		const response = await updateAttendanceStatus(attendanceId, status);
		res.status(response.success ? 200 : 500).json(response);
	}
);

export default router;
