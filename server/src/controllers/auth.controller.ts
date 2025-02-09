import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

// Login user and generate JWT token (POST)
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ error: 'Invalid credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET || '',
			{ expiresIn: '1d' }
		);

		res.json({ token, user });
	} catch (error) {
		res.status(400).json({ error: 'Invalid login request' });
	}
};

export const logoutUser = async (_req: Request, res: Response) => {
	res.json({ message: 'Logout successful' });
};
