import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, authorize } from '../middlewares/auth';
import {
	addGrade,
	getAllGrades,
	getGradeById,
	updateGradeStatus,
	updateGrade,
	deleteGrade,
	addGradeSubject,
	getAllGradeSubjects,
	getGradeSubjectById,
	updateGradeSubjectStatus,
	updateGradeSubject,
	deleteGradeSubject,
	addSubject,
	getAllSubjects,
	getSubjectById,
	updateSubjectStatus,
	updateSubject,
	deleteSubject,
	addStudentSubject,
	getAllStudentSubjects,
	updateStudentSubjectStatus,
	recordAttendance,
	getAllAttendance,
	updateAttendanceStatus,
	addAssignment,
	getAllAssignments,
	getAssignmentById,
	updateAssignment,
	deleteAssignment,
	addQuiz,
	getAllQuizzes,
	getQuizById,
	updateQuiz,
	deleteQuiz,
	addQuizStudent,
	getAllQuizStudents,
	getQuizStudentById,
	updateQuizStudent,
} from '../controllers/tution-controller';

const router = express.Router();

/* ---------- Grades ---------- */
// Add a new grade (only principal)
router.post(
	'/grades/add',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addGrade(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all grades (accessible by principal, teacher, or student)
router.get(
	'/grades',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllGrades();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get a single grade by ID (accessible by principal, teacher, or student)
router.get(
	'/grades/:gradeId',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeId } = req.params;
		const response = await getGradeById(gradeId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update grade status (Live/Archived)
router.put(
	'/grades/:gradeId/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeId } = req.params;
		const { status } = req.body;
		const response = await updateGradeStatus(gradeId, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update grade details (full update, only principal)
router.put(
	'/grades/:gradeId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeId } = req.params;
		const response = await updateGrade(gradeId, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Delete a grade (only principal)
router.delete(
	'/grades/:gradeId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeId } = req.params;
		const response = await deleteGrade(gradeId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

/* ---------- Grade-Subject ---------- */
// Add a new grade–subject relation (only principal)
router.post(
	'/grade-subject/add',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addGradeSubject(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all grade–subject relations (accessible by principal and teacher)
router.get(
	'/grade-subject',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllGradeSubjects();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get a single grade-subject relation by ID (accessible by principal and teacher)
router.get(
	'/grade-subject/:gradeSubjectId',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeSubjectId } = req.params;
		const response = await getGradeSubjectById(gradeSubjectId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update grade–subject relation status
router.put(
	'/grade-subject/:gradeSubjectId/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeSubjectId } = req.params;
		const { status } = req.body;
		const response = await updateGradeSubjectStatus(gradeSubjectId, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update grade-subject relation (full update, only principal)
router.put(
	'/grade-subject/:gradeSubjectId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeSubjectId } = req.params;
		const response = await updateGradeSubject(gradeSubjectId, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Delete a grade-subject relation (only principal)
router.delete(
	'/grade-subject/:gradeSubjectId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { gradeSubjectId } = req.params;
		const response = await deleteGradeSubject(gradeSubjectId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

/* ---------- Subjects ---------- */
// Add a new subject (only principal)
router.post(
	'/subjects/add',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addSubject(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all subjects (accessible by principal, teacher, and student)
router.get(
	'/subjects',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllSubjects();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get a single subject by ID (accessible by principal, teacher, and student)
router.get(
	'/subjects/:subjectId',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const { subjectId } = req.params;
		const response = await getSubjectById(subjectId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update subject status
router.put(
	'/subjects/:subjectId/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { subjectId } = req.params;
		const { status } = req.body;
		const response = await updateSubjectStatus(subjectId, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update subject details (full update, only principal)
router.put(
	'/subjects/:subjectId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { subjectId } = req.params;
		const response = await updateSubject(subjectId, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Delete a subject (only principal)
router.delete(
	'/subjects/:subjectId',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { subjectId } = req.params;
		const response = await deleteSubject(subjectId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

/* ---------- Student-Subject ---------- */
// Add a new student–subject relation (accessible by principal and teacher)
router.post(
	'/student-subject/add',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addStudentSubject(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all student–subject relations
router.get(
	'/student-subject',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllStudentSubjects();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update student–subject relation status
router.put(
	'/student-subject/:studentSubjectId/status',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { studentSubjectId } = req.params;
		const { status } = req.body;
		const response = await updateStudentSubjectStatus(studentSubjectId, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

/* ---------- Attendance ---------- */
// Record attendance (accessible only by teacher)
router.post(
	'/attendance/add',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await recordAttendance(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all attendance records (accessible by principal and teacher)
router.get(
	'/attendance',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllAttendance();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update attendance status
router.put(
	'/attendance/:attendanceId/status',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { attendanceId } = req.params;
		const { status } = req.body;
		const response = await updateAttendanceStatus(attendanceId, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.post(
	'/assignments/add',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addAssignment(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all assignments (accessible by principal, teacher, and student)
router.get(
	'/assignments',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllAssignments();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get a single assignment by ID (accessible by principal, teacher, and student)
router.get(
	'/assignments/:assignmentId',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const { assignmentId } = req.params;
		const response = await getAssignmentById(assignmentId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update assignment details (only teacher)
router.put(
	'/assignments/:assignmentId',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { assignmentId } = req.params;
		const response = await updateAssignment(assignmentId, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Delete an assignment (only teacher)
router.delete(
	'/assignments/:assignmentId',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { assignmentId } = req.params;
		const response = await deleteAssignment(assignmentId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

/* ---------- Quizzes ---------- */
// Add a new quiz (only teacher)
router.post(
	'/quizzes/add',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addQuiz(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all quizzes (accessible by principal, teacher, and student)
router.get(
	'/quizzes',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllQuizzes();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get a single quiz by ID (accessible by principal, teacher, and student)
router.get(
	'/quizzes/:quizId',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const { quizId } = req.params;
		const response = await getQuizById(quizId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update quiz details (only teacher)
router.put(
	'/quizzes/:quizId',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { quizId } = req.params;
		const response = await updateQuiz(quizId, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Delete a quiz (only teacher)
router.delete(
	'/quizzes/:quizId',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { quizId } = req.params;
		const response = await deleteQuiz(quizId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

/* ---------- QuizStudent ---------- */
// Add a new quiz-student record (teacher or student can add, e.g., when student attempts quiz)
router.post(
	'/quiz-student/add',
	authenticate,
	authorize(['teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addQuizStudent(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

// Get all quiz-student records (accessible by principal and teacher)
router.get(
	'/quiz-student',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllQuizStudents();
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Get a single quiz-student record by ID (accessible by principal, teacher, and student)
router.get(
	'/quiz-student/:quizStudentId',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const { quizStudentId } = req.params;
		const response = await getQuizStudentById(quizStudentId);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// Update quiz-student details (e.g., mark or status, only teacher)
router.put(
	'/quiz-student/:quizStudentId',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { quizStudentId } = req.params;
		const response = await updateQuizStudent(quizStudentId, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// /* ---------- Notes ---------- */
// // Add a new note (only teacher)
// router.post(
// 	'/notes/add',
// 	authenticate,
// 	authorize(['teacher']),
// 	asyncHandler(async (req: Request, res: Response) => {
// 		const response = await addNote(req.body); // New controller
// 		res.status(response.success ? 201 : 500).json(response);
// 	})
// );

// // Get all notes (accessible by principal, teacher, student)
// router.get(
// 	'/notes',
// 	authenticate,
// 	authorize(['principal', 'teacher', 'student']),
// 	asyncHandler(async (_req: Request, res: Response) => {
// 		const response = await getAllNotes(); // New controller
// 		res.status(response.success ? 200 : 500).json(response);
// 	})
// );

// // Get a single note by ID (accessible by principal, teacher, student)
// router.get(
// 	'/notes/:noteId',
// 	authenticate,
// 	authorize(['principal', 'teacher', 'student']),
// 	asyncHandler(async (req: Request, res: Response) => {
// 		const { noteId } = req.params;
// 		const response = await getNoteById(noteId); // New controller
// 		res.status(response.success ? 200 : 500).json(response);
// 	})
// );

export default router;
