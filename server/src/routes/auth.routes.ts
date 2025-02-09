import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema, userSchema } from '../validators';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(userSchema), register);

export default router;
