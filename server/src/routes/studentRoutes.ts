import express from 'express';
import StudentController from '../controllers/studentController';
import { userSchema } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateRequest(userSchema), StudentController.addStudent);
router.put('/edit', validateRequest(userSchema), StudentController.editStudent);
router.put('/archive', StudentController.archiveStudent);
router.put('/restore', StudentController.restoreStudent);

export default router;
