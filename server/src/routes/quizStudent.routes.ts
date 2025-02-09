import express from 'express';
import {
	attemptQuiz,
	getQuizAttempts,
	updateQuizAttempt,
} from '../controllers/quizStudent.controller';
import { isAuthenticated, isStudent } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.post('/', isAuthenticated, isStudent, validate, attemptQuiz);
router.get('/', isAuthenticated, getQuizAttempts);
router.put('/:id', isAuthenticated, isStudent, validate, updateQuizAttempt);

export default router;
