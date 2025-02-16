import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/User';
import { Error } from 'mongoose';

// Register a new user
export const registerUserService = async (
	email: string,
	password: string,
	role: string
) => {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error('User already exists');
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create user
	const newUser = new User({
		email,
		password: hashedPassword,
		role,
	});
	await newUser.save();

	return { id: newUser.id, email: newUser.email, role: newUser.role };
};

// Login user and return token
export const loginUserService = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	// Find user by email
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Invalid email or password');
	}

	// Compare passwords
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Invalid email or password');
	}

	// Generate JWT token
	const token = jwt.sign(
		{ id: user.id, role: user.role },
		process.env.JWT_SECRET!,
		{
			expiresIn: '7d',
		}
	);

	return { id: user.id, email: user.email, role: user.role, token };
};

// Get currently logged-in user
export const getCurrentUserService = async (userId: string) => {
	const user = await User.findById(userId).select('-password'); // Exclude password field
	if (!user) {
		throw new Error('User not found');
	}
	return user;
};

// Register a new teacher (Only for principal)
export const registerTeacherService = async (teacherData: Partial<IUser>) => {
	// Ensure role is set to 'teacher'
	const teacher = await registerUserService(
		teacherData.email!,
		teacherData.password!,
		'teacher'
	);
	return teacher;
};

/**
 * Get all teachers
 */
export const getAllTeachersService = async () => {
	const teachers = await User.find({ role: 'teacher' }).select('-password');
	return teachers;
};

/**
 * Get all students
 */
export const getAllStudentsService = async () => {
	const students = await User.find({ role: 'student' }).select('-password');
	return students;
};

/**
 * Get all parents
 */
export const getAllParentsService = async () => {
	const parents = await User.find({ role: 'parent' }).select('-password');
	return parents;
};
