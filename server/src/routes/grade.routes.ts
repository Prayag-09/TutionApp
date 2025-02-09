import express from 'express';
import {
	createGrade,
	getGrades,
	updateGrade,
	archiveGrade,
} from '../controllers/grade.controller';
import { isAuthenticated, isPrincipal } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { gradeValidator } from '../validators';

const router = express.Router();

router.post(
	'/',
	isAuthenticated,
	isPrincipal,
	validate(gradeValidator),
	createGrade
);
router.get('/', isAuthenticated, getGrades);
router.put(
	'/:id',
	isAuthenticated,
	isPrincipal,
	validate(gradeValidator),
	updateGrade
);
router.patch('/:id/archive', isAuthenticated, isPrincipal, archiveGrade);

export default router;
