import express from 'express';
import {
	markAttendance,
	getAttendance,
	updateAttendance,
} from '../controllers/attendance.controller';
import { isAuthenticated, isTeacher } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.post('/', isAuthenticated, isTeacher, validate, markAttendance);
router.get('/', isAuthenticated, getAttendance);
router.put('/:id', isAuthenticated, isTeacher, validate, updateAttendance);

export default router;
