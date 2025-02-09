import express from 'express';
import {
	createSubject,
	getSubjects,
	updateSubject,
	archiveSubject,
} from '../controllers/subject.controller';
import { isAuthenticated, isPrincipal } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { subjectValidator } from '../validators';

const router = express.Router();

router.post(
	'/',
	isAuthenticated,
	isPrincipal,
	validate(subjectValidator),
	createSubject
);
router.get('/', isAuthenticated, getSubjects);
router.put(
	'/:id',
	isAuthenticated,
	isPrincipal,
	validate(subjectValidator),
	updateSubject
);
router.patch('/:id/archive', isAuthenticated, isPrincipal, archiveSubject);

export default router;
