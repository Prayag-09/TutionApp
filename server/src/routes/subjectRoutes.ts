import express from 'express';
import SubjectController from '../controllers/subjectController';
import { subjectValidator } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post(
	'/add',
	validateRequest(subjectValidator),
	SubjectController.addSubject
);
router.put(
	'/edit',
	validateRequest(subjectValidator),
	SubjectController.editSubject
);
router.put('/archive', SubjectController.archiveSubject);
router.put('/restore', SubjectController.restoreSubject);

export default router;
