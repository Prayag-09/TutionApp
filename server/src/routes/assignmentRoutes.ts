import express from 'express';
import AssignmentController from '../controllers/assignmentController';
import { assignmentSchema } from '../validators';
import { validateRequest } from '../middleware/validation';
const router = express.Router();

router.post(
	'/add',
	validateRequest(assignmentSchema),
	AssignmentController.addAssignment
);
router.put(
	'/edit',
	validateRequest(assignmentSchema),
	AssignmentController.editAssignment
);
router.put('/archive', AssignmentController.archiveAssignment);
router.put('/restore', AssignmentController.restoreAssignment);

export default router;
