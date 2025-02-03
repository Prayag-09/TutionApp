import express from 'express';
import GradeController from '../controllers/gradeController';
import { gradeValidator } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateRequest(gradeValidator), GradeController.addGrade);
router.put('/edit', validateRequest(gradeValidator), GradeController.editGrade);
router.put('/archive', GradeController.archiveGrade);
router.put('/restore', GradeController.restoreGrade);

export default router;
