import express from 'express';
import authController from '../controllers/authController';
import { loginSchema } from '../validators';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/login', validateRequest(loginSchema), authController.login);

export default router;
