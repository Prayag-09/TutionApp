import express from 'express';
import {
	createAssignment,
	getAssignments,
	updateAssignment,
	archiveAssignment,
} from '../controllers/assignment.controller';
import { isAuthenticated, isTeacher } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { assignmentSchema } from '../validators';

const router = express.Router();

router.post(
	'/',
	isAuthenticated,
	isTeacher,
	validate(assignmentSchema),
	createAssignment
);
router.get('/', isAuthenticated, getAssignments);
router.put(
	'/:id',
	isAuthenticated,
	isTeacher,
	validate(assignmentSchema),
	updateAssignment
);
router.patch('/:id/archive', isAuthenticated, isTeacher, archiveAssignment);

export default router;
