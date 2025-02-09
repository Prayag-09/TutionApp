import express from 'express';
import {
	assignSubjectToStudent,
	getStudentSubjects,
	removeStudentSubject,
} from '../controllers/studentSubject.controller';
import { isAuthenticated, isTeacher } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.post('/', isAuthenticated, isTeacher, validate, assignSubjectToStudent);
router.get('/', isAuthenticated, getStudentSubjects);
router.delete('/:id', isAuthenticated, isTeacher, removeStudentSubject);

export default router;
