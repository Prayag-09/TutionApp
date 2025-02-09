import express from 'express';
import {
	createQuiz,
	getQuizzes,
	updateQuiz,
	archiveQuiz,
} from '../controllers/quiz.controller';
import { isAuthenticated, isTeacher } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { quizSchema } from '../validators';

const router = express.Router();

router.post('/', isAuthenticated, isTeacher, validate(quizSchema), createQuiz);
router.get('/', isAuthenticated, getQuizzes);
router.put(
	'/:id',
	isAuthenticated,
	isTeacher,
	validate(quizSchema),
	updateQuiz
);
router.patch('/:id/archive', isAuthenticated, isTeacher, archiveQuiz);

export default router;
