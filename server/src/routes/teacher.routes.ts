import express from 'express';
import {
	createTeacher,
	getTeachers,
	updateTeacher,
	deleteTeacher,
} from '../controllers/teacher.controller';
import { isAuthenticated, isPrincipal } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userSchema } from '../validators';

const router = express.Router();

router.post(
	'/',
	isAuthenticated,
	isPrincipal,
	validate(userSchema),
	createTeacher
);
router.get('/', isAuthenticated, getTeachers);
router.put(
	'/:id',
	isAuthenticated,
	isPrincipal,
	validate(userSchema),
	updateTeacher
);
router.delete('/:id', isAuthenticated, isPrincipal, deleteTeacher);

export default router;
