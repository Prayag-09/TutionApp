import express from 'express';
import TeacherController from '../controllers/teacherController';
import { userSchema } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateRequest(userSchema), TeacherController.addTeacher);
router.put('/edit', validateRequest(userSchema), TeacherController.editTeacher);
router.put('/archive', TeacherController.archiveTeacher);
router.put('/restore', TeacherController.restoreTeacher);

export default router;
