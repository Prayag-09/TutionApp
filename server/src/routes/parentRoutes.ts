import express from 'express';
import ParentController from '../controllers/parentController';
import { userSchema } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateRequest(userSchema), ParentController.addParent);
router.put('/edit', validateRequest(userSchema), ParentController.editParent);
router.put('/archive', ParentController.archiveParent);
router.put('/restore', ParentController.restoreParent);

export default router;
