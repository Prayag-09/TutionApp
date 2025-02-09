import express from 'express';
import {
	createParent,
	getParents,
	updateParent,
	deleteParent,
} from '../controllers/parent.controller';
import { isAuthenticated, isPrincipal } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userSchema } from '../validators';

const router = express.Router();

router.post(
	'/',
	isAuthenticated,
	isPrincipal,
	validate(userSchema),
	createParent
);
router.get('/', isAuthenticated, getParents);
router.put(
	'/:id',
	isAuthenticated,
	isPrincipal,
	validate(userSchema),
	updateParent
);
router.delete('/:id', isAuthenticated, isPrincipal, deleteParent);

export default router;
