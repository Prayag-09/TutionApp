import express from 'express';
import {
	createMark,
	getMarks,
	updateMark,
} from '../controllers/marks.controller';
import { isAuthenticated, isTeacher } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.post('/', isAuthenticated, isTeacher, validate, createMark);
router.get('/', isAuthenticated, getMarks);
router.put('/:id', isAuthenticated, isTeacher, validate, updateMark);

export default router;
