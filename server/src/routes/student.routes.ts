import express from 'express';
import {
	createStudent,
	getStudents,
	updateStudent,
	deleteStudent,
} from '../controllers/student.controller';
import { isAuthenticated, isPrincipalOrTeacher } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userSchema } from '../validators';

const router = express.Router();

router.post(
	'/',
	isAuthenticated,
	isPrincipalOrTeacher,
	validate(userSchema),
	createStudent
);
router.get('/', isAuthenticated, getStudents);
router.put(
	'/:id',
	isAuthenticated,
	isPrincipalOrTeacher,
	validate(userSchema),
	updateStudent
);
router.delete('/:id', isAuthenticated, isPrincipal, deleteStudent);

export default router;
