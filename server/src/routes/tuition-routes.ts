import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, authorize } from '../middlewares/auth';
import {
	addGradeController,
	getAllGradesController,
	getGradeByIdController,
	updateGradeStatusController,
	updateGradeController,
	deleteGradeController,
	addSubjectController,
	getAllSubjectsController,
	getSubjectByIdController,
	updateSubjectStatusController,
	updateSubjectController,
	deleteSubjectController,
	addGradeSubjectController,
	getAllGradeSubjectsController,
	getGradeSubjectByIdController,
	updateGradeSubjectStatusController,
	updateGradeSubjectController,
	deleteGradeSubjectController,
	addStudentSubjectController,
	getAllStudentSubjectsController,
	updateStudentSubjectStatusController,
	recordAttendanceController,
	getAllAttendanceController,
	updateAttendanceStatusController,
	addAssignmentController,
	getAllAssignmentsController,
	getAssignmentByIdController,
	updateAssignmentController,
	deleteAssignmentController,
	addQuizController,
	getAllQuizzesController,
	getQuizByIdController,
	updateQuizController,
	deleteQuizController,
	addQuizStudentController,
	getAllQuizStudentsController,
	getQuizStudentByIdController,
	updateQuizStudentController,
	addNoteController,
	getAllNotesController,
	getNoteByIdController,
} from '../controllers/tuition-controller';

const router = express.Router();

// --- Grades ---
router.post(
	'/grades',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addGradeController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/grades',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllGradesController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/grades/:id',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getGradeByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/grades/:id/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { status } = req.body;
		if (!['Live', 'Archive'].includes(status)) {
			throw new Error('Invalid status value');
		}
		const response = await updateGradeStatusController(req.params.id, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/grades/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await updateGradeController(req.params.id, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.delete(
	'/grades/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await deleteGradeController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Subjects ---
router.post(
	'/subjects',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addSubjectController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/subjects',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllSubjectsController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/subjects/:id',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getSubjectByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/subjects/:id/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { status } = req.body;
		if (!['Live', 'Archive'].includes(status)) {
			throw new Error('Invalid status value');
		}
		const response = await updateSubjectStatusController(req.params.id, status);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/subjects/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await updateSubjectController(req.params.id, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.delete(
	'/subjects/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await deleteSubjectController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Grade-Subjects ---
router.post(
	'/grade-subjects',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addGradeSubjectController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/grade-subjects',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllGradeSubjectsController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/grade-subjects/:id',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getGradeSubjectByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/grade-subjects/:id/status',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const { status } = req.body;
		if (!['Live', 'Archive'].includes(status)) {
			throw new Error('Invalid status value');
		}
		const response = await updateGradeSubjectStatusController(
			req.params.id,
			status
		);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/grade-subjects/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await updateGradeSubjectController(
			req.params.id,
			req.body
		);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.delete(
	'/grade-subjects/:id',
	authenticate,
	authorize(['principal']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await deleteGradeSubjectController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Student-Subjects ---
router.post(
	'/student-subjects',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addStudentSubjectController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/student-subjects',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllStudentSubjectsController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/student-subjects/:id/status',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { status } = req.body;
		if (!['Live', 'Archive'].includes(status)) {
			throw new Error('Invalid status value');
		}
		const response = await updateStudentSubjectStatusController(
			req.params.id,
			status
		);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Attendance ---
router.post(
	'/attendance',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await recordAttendanceController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/attendance',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllAttendanceController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/attendance/:id/status',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const { status } = req.body;
		if (!['Present', 'Absent', 'Late'].includes(status)) {
			throw new Error('Invalid status value');
		}
		const response = await updateAttendanceStatusController(
			req.params.id,
			status
		);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Assignments ---
router.post(
	'/assignments',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addAssignmentController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/assignments',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllAssignmentsController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/assignments/:id',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getAssignmentByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/assignments/:id',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await updateAssignmentController(req.params.id, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.delete(
	'/assignments/:id',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await deleteAssignmentController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Quizzes ---
router.post(
	'/quizzes',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addQuizController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/quizzes',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllQuizzesController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/quizzes/:id',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getQuizByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/quizzes/:id',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await updateQuizController(req.params.id, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.delete(
	'/quizzes/:id',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await deleteQuizController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Quiz-Students ---
router.post(
	'/quiz-students',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addQuizStudentController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/quiz-students',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllQuizStudentsController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/quiz-students/:id',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getQuizStudentByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/quiz-students/:id',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await updateQuizStudentController(req.params.id, req.body);
		res.status(response.success ? 200 : 500).json(response);
	})
);

// --- Notes ---
router.post(
	'/notes',
	authenticate,
	authorize(['teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addNoteController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/notes',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllNotesController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/notes/:id',
	authenticate,
	authorize(['principal', 'teacher', 'student']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getNoteByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

export default router;
