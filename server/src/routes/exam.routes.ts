import express from 'express';
import {
	createExam,
	getExams,
	updateExam,
} from '../controllers/exam.controller';
import { isAuthenticated, isTeacher } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.post('/', isAuthenticated, isTeacher, validate, createExam);
router.get('/', isAuthenticated, getExams);
router.put('/:id', isAuthenticated, isTeacher, validate, updateExam);

export default router;
