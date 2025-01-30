import express from 'express';
import AssignmentController from '../controllers/assignmentController';

const router = express.Router();

router.post('/add', AssignmentController.addAssignment);
router.put('/edit', AssignmentController.editAssignment);
router.put('/archive', AssignmentController.archiveAssignment);
router.put('/restore', AssignmentController.restoreAssignment);

export default router;
