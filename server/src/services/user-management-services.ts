import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { Teacher } from '../models/Teacher';
import { Student } from '../models/Student';
import { Parent } from '../models/Parent';

/**
 * Register a new Teacher
 */
export const registerTeacherService = async (teacherData: any) => {
	try {
		// Check for duplicate email
		if (await User.exists({ email: teacherData.email })) {
			throw new Error('Email already in use');
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(teacherData.password, 10);

		// Create User record
		const user = await new User({
			email: teacherData.email,
			password: hashedPassword,
			role: 'teacher',
		}).save();

		// Create Teacher record
		const teacher = await new Teacher({
			...teacherData,
			email: user.email,
		}).save();

		return teacher;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'An unknown error occurred'
		);
	}
};

/**
 * Register a new Student
 */
export const registerStudentService = async (studentData: any) => {
	try {
		if (await User.exists({ email: studentData.email })) {
			throw new Error('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(studentData.password, 10);

		const user = await new User({
			email: studentData.email,
			password: hashedPassword,
			role: 'student',
		}).save();

		const student = await new Student({
			...studentData,
			email: user.email,
		}).save();

		return student;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'An unknown error occurred'
		);
	}
};

/**
 * Register a new Parent
 */
export const registerParentService = async (parentData: any) => {
	try {
		if (await User.exists({ email: parentData.email })) {
			throw new Error('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(parentData.password, 10);

		const user = await new User({
			email: parentData.email,
			password: hashedPassword,
			role: 'parent',
		}).save();

		const parent = await new Parent({
			...parentData,
			email: user.email,
		}).save();

		return parent;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'An unknown error occurred'
		);
	}
};

/**
 * Get All Teachers
 */
export const getAllTeachersService = async () => {
	try {
		return await Teacher.find().select('-password');
	} catch (error) {
		throw new Error('Failed to retrieve teachers');
	}
};

/**
 * Get All Students
 */
export const getAllStudentsService = async () => {
	try {
		return await Student.find().select('-password');
	} catch (error) {
		throw new Error('Failed to retrieve students');
	}
};

/**
 * Get All Parents
 */
export const getAllParentsService = async () => {
	try {
		return await Parent.find().select('-password');
	} catch (error) {
		throw new Error('Failed to retrieve parents');
	}
};
