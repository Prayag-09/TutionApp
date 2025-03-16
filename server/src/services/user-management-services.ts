import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { Teacher } from '../models/Teacher';
import { Student } from '../models/Student';
import { Parent } from '../models/Parent';

interface RegisterUserData {
	email: string;
	password: string;
}

interface RegisterTeacherData extends RegisterUserData {
	teacherName: string;
	mobileNumber: string;
	residentialAddress: string;
	qualification: string;
	status: string;
	gradeSubjects: string[];
}

interface RegisterStudentData extends RegisterUserData {
	name: string;
	mobile: string;
	residentialAddress: string;
	parentId: string;
	gradeId: string;
	subjects: string[];
	status: string;
}

interface RegisterParentData extends RegisterUserData {
	name: string;
	mobile: string;
	residentialAddress: string;
	status: string;
}

/**
 * Register a new Teacher
 */
export const registerTeacherService = async (
	teacherData: RegisterTeacherData
) => {
	try {
		if (await User.exists({ email: teacherData.email })) {
			throw new Error('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(teacherData.password, 10);

		const [user, teacher] = await Promise.all([
			new User({
				email: teacherData.email,
				password: hashedPassword,
				role: 'teacher',
			}).save(),

			new Teacher({
				...teacherData,
				password: undefined,
			}).save(),
		]);

		return teacher;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to register teacher'
		);
	}
};

/**
 * Register a new Student
 */
export const registerStudentService = async (
	studentData: RegisterStudentData
) => {
	try {
		if (await User.exists({ email: studentData.email })) {
			throw new Error('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(studentData.password, 10);

		const [user, student] = await Promise.all([
			new User({
				email: studentData.email,
				password: hashedPassword,
				role: 'student',
			}).save(),

			new Student({
				...studentData,
				password: undefined,
			}).save(),
		]);

		return student;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to register student'
		);
	}
};

/**
 * Register a new Parent
 */
export const registerParentService = async (parentData: RegisterParentData) => {
	try {
		if (await User.exists({ email: parentData.email })) {
			throw new Error('Email already in use');
		}

		if (!parentData.password) {
			throw new Error('Password is required');
		}

		const hashedPassword = await bcrypt.hash(parentData.password, 10);

		const [user, parent] = await Promise.all([
			new User({
				email: parentData.email,
				password: hashedPassword,
				role: 'parent',
			}).save(),

			new Parent({
				...parentData,
				password: undefined,
			}).save(),
		]);

		return parent;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to register parent'
		);
	}
};

/**
 * Get All Teachers
 */
export const getAllTeachersService = async () => {
	try {
		const teachers = await Teacher.find().select('-password');
		return teachers;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to retrieve teachers'
		);
	}
};

/**
 * Get All Students
 */
export const getAllStudentsService = async () => {
	try {
		const students = await Student.find().select('-password');
		return students;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to retrieve students'
		);
	}
};

/**
 * Get All Parents
 */
export const getAllParentsService = async () => {
	try {
		const parents = await Parent.find().select('-password');
		return parents;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to retrieve parents'
		);
	}
};

/**
 * Utility function to remove undefined fields from an object
 */
const removeUndefinedFields = (obj: Record<string, any>) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined)
	);
};

/**
 * Update Teacher
 */
export const updateTeacherService = async (
	teacherId: string,
	teacherData: Partial<RegisterTeacherData>
) => {
	try {
		const filteredData = removeUndefinedFields(teacherData);
		const updatedTeacher = await Teacher.findOneAndUpdate(
			{ _id: teacherId },
			{ $set: filteredData },
			{ new: true, runValidators: true }
		);

		if (!updatedTeacher) {
			throw new Error('Teacher not found');
		}

		return updatedTeacher;
	} catch (error) {
		throw new Error(
			error instanceof Error
				? error.message
				: 'Failed to update teacher details'
		);
	}
};

/**
 * Update Student
 */
export const updateStudentService = async (
	studentId: string,
	studentData: Partial<RegisterStudentData>
) => {
	try {
		const filteredData = removeUndefinedFields(studentData);
		const updatedStudent = await Student.findOneAndUpdate(
			{ _id: studentId },
			{ $set: filteredData },
			{ new: true, runValidators: true }
		);

		if (!updatedStudent) {
			throw new Error('Student not found');
		}

		return updatedStudent;
	} catch (error) {
		throw new Error(
			error instanceof Error
				? error.message
				: 'Failed to update student details'
		);
	}
};

/**
 * Update Parent
 */
export const updateParentService = async (
	parentId: string,
	parentData: Partial<RegisterParentData>
) => {
	try {
		const filteredData = removeUndefinedFields(parentData);
		const updatedParent = await Parent.findOneAndUpdate(
			{ _id: parentId },
			{ $set: filteredData },
			{ new: true, runValidators: true }
		);

		if (!updatedParent) {
			throw new Error('Parent not found');
		}

		return updatedParent;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to update parent details'
		);
	}
};

export const updateUserStatusService = async (
	userId: string,
	role: 'teacher' | 'student' | 'parent',
	status: 'Live' | 'Archive'
) => {
	try {
		let model: typeof Teacher | typeof Student | typeof Parent;
		if (role === 'teacher') model = Teacher as typeof Teacher;
		else if (role === 'student') model = Student as typeof Student;
		else if (role === 'parent') model = Parent as typeof Parent;
		else throw new Error('Invalid role');

		let updatedUser;
		if (model === Teacher) {
			updatedUser = await Teacher.findOneAndUpdate(
				{ _id: userId },
				{ $set: { status } },
				{ new: true, runValidators: true }
			);
		} else if (model === Student) {
			updatedUser = await Student.findOneAndUpdate(
				{ _id: userId },
				{ $set: { status } },
				{ new: true, runValidators: true }
			);
		} else if (model === Parent) {
			updatedUser = await Parent.findOneAndUpdate(
				{ _id: userId },
				{ $set: { status } },
				{ new: true, runValidators: true }
			);
		}

		if (!updatedUser) {
			throw new Error(
				`${role.charAt(0).toUpperCase() + role.slice(1)} not found`
			);
		}

		return updatedUser;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : `Failed to update ${role} status`
		);
	}
};
