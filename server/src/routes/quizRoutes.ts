import express from 'express';
import QuizController from '../controllers/quizController';
import { quizSchema } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateRequest(quizSchema), QuizController.addQuiz);
router.put('/edit', validateRequest(quizSchema), QuizController.editQuiz);
router.put('/archive', QuizController.archiveQuiz);
router.put('/restore', QuizController.restoreQuiz);

export default router;
