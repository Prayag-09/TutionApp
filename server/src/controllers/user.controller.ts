import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { loginValidator } from '../validators/index';
import dotenv from 'dotenv';

dotenv.config();

// Register a new user (POST)
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			role,
			status: 'Live',
		});
		await newUser.save();

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error registering user' });
	}
};

// Login user and generate JWT token (POST)
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = loginValidator.parse(req.body);

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

// Logout user (optional: invalidate token on frontend)
export const logoutUser = async (_req: Request, res: Response) => {
	res.json({ message: 'Logout successful' });
};

// Get current logged-in user (GET)
export const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');
		if (!user) return res.status(404).json({ error: 'User not found' });

		res.json(user);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching user details' });
	}
};

// Edit user status (Live / Archived) (EDIT)
export const updateUserStatus = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const user = await User.findByIdAndUpdate(
			userId,
			{ status },
			{ new: true }
		);
		if (!user) return res.status(404).json({ error: 'User not found' });

		res.json({ message: `User status updated to ${status}`, user });
	} catch (error) {
		res.status(500).json({ error: 'Error updating user status' });
	}
};
