import bcrypt from 'bcrypt';
import { IUser, User } from '../models/User';
import { Teacher } from '../models/Teacher';
import { Student } from '../models/Student';
import { Parent } from '../models/Parent';
import {
	teacherValidator,
	studentValidator,
	parentValidator,
} from '../validators/index';

/**
 * Register Teacher Service
 */
export const registerTeacherService = async (teacherData: Partial<IUser>) => {
	// Validate teacher data
	const validatedData = teacherValidator.safeParse(teacherData);
	if (!validatedData.success) {
		throw new Error(
			validatedData.error.errors.map((err) => err.message).join(', ')
		);
	}

	// Hash password before saving
	const hashedPassword = await bcrypt.hash(teacherData.password!, 10);

	// Create User record
	const user = new User({
		email: teacherData.email,
		password: hashedPassword,
		role: 'teacher',
	});
	await user.save();

	// Create Teacher record
	const teacher = new Teacher({
		...validatedData.data,
		email: user.email,
	});
	await teacher.save();

	// Return service feedback in JSON
	return { id: user.id, email: user.email, role: user.role };
};

/**
 * Register Student Service
 */
export const registerStudentService = async (studentData: Partial<IUser>) => {
	// Validate student data
	const validatedData = studentValidator.safeParse(studentData);
	if (!validatedData.success) {
		throw new Error(
			validatedData.error.errors.map((err) => err.message).join(', ')
		);
	}

	// Hash password before saving
	const hashedPassword = await bcrypt.hash(studentData.password!, 10);

	// Create User record
	const user = new User({
		email: studentData.email,
		password: hashedPassword,
		role: 'student',
	});
	await user.save();

	// Create Student record
	const student = new Student({
		...validatedData.data,
		email: user.email,
	});
	await student.save();

	// Return service feedback in JSON
	return { id: user.id, email: user.email, role: user.role };
};

/**
 * Register Parent Service
 */
export const registerParentService = async (parentData: Partial<IUser>) => {
	// Validate parent data
	const validatedData = parentValidator.safeParse(parentData);
	if (!validatedData.success) {
		throw new Error(
			validatedData.error.errors.map((err) => err.message).join(', ')
		);
	}

	// Hash password before saving
	const hashedPassword = await bcrypt.hash(parentData.password!, 10);

	// Create User record
	const user = new User({
		email: parentData.email,
		password: hashedPassword,
		role: 'parent',
	});
	await user.save();

	// Create Parent record
	const parent = new Parent({
		...validatedData.data,
		email: user.email,
	});
	await parent.save();

	// Return service feedback in JSON
	return { id: user.id, email: user.email, role: user.role };
};

/**
 * Get All Teachers Service
 */
export const getAllTeachersService = async () => {
	const teachers = await Teacher.find().select('-password');
	return teachers; // Return JSON feedback
};

/**
 * Get All Students Service
 */
export const getAllStudentsService = async () => {
	const students = await Student.find().select('-password');
	return students; // Return JSON feedback
};

/**
 * Get All Parents Service
 */
export const getAllParentsService = async () => {
	const parents = await Parent.find().select('-password');
	return parents; // Return JSON feedback
};
