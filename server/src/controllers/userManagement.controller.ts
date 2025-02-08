import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Teacher } from '../models/Teacher';
import { Student } from '../models/Student';
import { Parent } from '../models/Parent';
import { loginValidator } from '../validators/index';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined in the environment variables.');
}

// **User Registration**
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, role } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' });
		}

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
		console.error(error);
		res.status(500).json({ error: 'Error registering user' });
	}
};

// **Login User**
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = loginValidator.parse(req.body);

		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ error: 'Invalid credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

		const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: '1d',
		});

		res.json({ token, user });
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: 'Invalid login request' });
	}
};

// **Get Current User**
export const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');
		if (!user) return res.status(404).json({ error: 'User not found' });

		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching user details' });
	}
};

// **Update User Status**
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
		console.error(error);
		res.status(500).json({ error: 'Error updating user status' });
	}
};

// **Register a Teacher**
export const registerTeacher = async (req: Request, res: Response) => {
	try {
		const { name, email, password, subject, grade } = req.body;

		// Create a User entry
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ error: 'User with this email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			password: hashedPassword,
			role: 'Teacher',
			status: 'Live',
		});
		await user.save();

		// Create a Teacher entry
		const newTeacher = new Teacher({
			name,
			subject,
			grade,
			userId: user._id,
			status: 'Live',
		});
		await newTeacher.save();

		res.status(201).json({
			message: 'Teacher registered successfully',
			user,
			teacher: newTeacher,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error registering teacher' });
	}
};

// **Register a Student**
export const registerStudent = async (req: Request, res: Response) => {
	try {
		const { name, email, password, age, grade, parentId } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ error: 'User with this email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			password: hashedPassword,
			role: 'Student',
			status: 'Live',
		});
		await user.save();

		const newStudent = new Student({
			name,
			age,
			grade,
			parentId,
			userId: user._id,
			status: 'Live',
		});
		await newStudent.save();

		res.status(201).json({
			message: 'Student registered successfully',
			user,
			student: newStudent,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error registering student' });
	}
};

// **Register a Parent**
export const registerParent = async (req: Request, res: Response) => {
	try {
		const { name, email, password, phone } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ error: 'User with this email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			password: hashedPassword,
			role: 'Parent',
			status: 'Live',
		});
		await user.save();

		const newParent = new Parent({
			name,
			email,
			phone,
			userId: user._id,
			status: 'Live',
		});
		await newParent.save();

		res.status(201).json({
			message: 'Parent registered successfully',
			user,
			parent: newParent,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error registering parent' });
	}
};

// **Get All Teachers**
export const getAllTeachers = async (_req: Request, res: Response) => {
	try {
		const teachers = await Teacher.find().populate('userId', 'name email');
		res.json(teachers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching teachers' });
	}
};

// **Get All Students**
export const getAllStudents = async (_req: Request, res: Response) => {
	try {
		const students = await Student.find().populate('userId', 'name email');
		res.json(students);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching students' });
	}
};

// **Get All Parents**
export const getAllParents = async (_req: Request, res: Response) => {
	try {
		const parents = await Parent.find().populate('userId', 'name email');
		res.json(parents);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching parents' });
	}
};
