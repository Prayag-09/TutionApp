import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

router.get('/', authenticate, authorize(['principal', 'teacher']), (req, res) => {
  res.json({ message: 'Reports endpoint stub' });
});

export default router; 