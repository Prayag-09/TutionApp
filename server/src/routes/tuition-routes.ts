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
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const sanitizeFileName = (filename: string) => {
	return filename
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9.\-]/g, '')
		.slice(0, 100);
};

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadDir);
	},
	filename: (_req: Request, file, cb) => {
		const timestamp = Date.now();
		const cleanName = sanitizeFileName(file.originalname);
		cb(null, `${file.fieldname}-${timestamp}-${cleanName}`);
	},
});

const fileFilter = (
	_req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const allowedTypes = [
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Only PDF or DOCX files are allowed'));
	}
};

export const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file limit
});

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
	'/grade-subject',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await addGradeSubjectController(req.body);
		res.status(response.success ? 201 : 500).json(response);
	})
);

router.get(
	'/grade-subject',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (_req: Request, res: Response) => {
		const response = await getAllGradeSubjectsController();
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.get(
	'/grade-subject/:id',
	authenticate,
	authorize(['principal', 'teacher']),
	asyncHandler(async (req: Request, res: Response) => {
		const response = await getGradeSubjectByIdController(req.params.id);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.put(
	'/grade-subject/:id/status',
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
	'/grade-subject/:id',
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
	'/grade-subject/:id',
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
	'/assignments/add',
	authenticate,
	authorize(['teacher']),
	upload.single('detailsFile'),
	asyncHandler(async (req: Request, res: Response) => {
		const assignmentData = {
			...req.body,
			detailsFile: req.file ? req.file.path : undefined,
		};
		const response = await addAssignmentController(assignmentData);
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
	upload.single('detailsFile'),
	asyncHandler(async (req: Request, res: Response) => {
		const assignmentData = {
			...req.body,
			detailsFile: req.file ? req.file.path : undefined,
		};
		const response = await updateAssignmentController(
			req.params.id,
			assignmentData
		);
		res.status(response.success ? 200 : 500).json(response);
	})
);

router.delete(
	'/assignments/:id',
	authenticate,
	authorize(['principal', 'teacher']),
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
