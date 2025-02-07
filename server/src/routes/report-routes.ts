import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

// Placeholder route for reports; adjust roles as needed.
router.get('/', authenticate, authorize(['principal', 'teacher']), (req, res) => {
  res.json({ message: 'Reports endpoint stub' });
});

export default router; 