import express from 'express';
import {
	assignSubjectToGrade,
	getGradeSubjects,
	removeGradeSubject,
} from '../controllers/gradeSubject.controller';
import { isAuthenticated, isPrincipal } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.post('/', isAuthenticated, isPrincipal, validate(), assignSubjectToGrade);
router.get('/', isAuthenticated, getGradeSubjects);
router.delete('/:id', isAuthenticated, isPrincipal, removeGradeSubject);

export default router;
