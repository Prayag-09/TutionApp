import express from 'express';
import authenticate from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = express.Router();

router.get(
	'/protected',
	authenticate,
	authorize(['Teacher', 'Principal']),
	(req, res) => {
		res.json({ message: 'You have accessed a protected route.' });
	}
);

export default router;
