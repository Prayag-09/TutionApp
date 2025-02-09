import express from 'express';
import {
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} from '../controllers/user.controller';
import { isAuthenticated, isAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userSchema } from '../validators';

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getUsers);
router.get('/:id', isAuthenticated, getUserById);
router.put('/:id', isAuthenticated, validate(userSchema), updateUser);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);

export default router;
