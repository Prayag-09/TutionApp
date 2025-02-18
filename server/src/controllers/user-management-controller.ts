import {
	registerTeacherService,
	registerStudentService,
	registerParentService,
	getAllTeachersService,
	getAllStudentsService,
	getAllParentsService,
} from '../services/user-management-services';

/**
 * Register a new teacher
 */
export const registerTeacher = async (teacherData: any) => {
	try {
		const response = await registerTeacherService(teacherData);
		return response; // Feedback from the service
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message); // Pass error to be handled in the route
		} else {
			throw new Error('An unknown error occurred'); // Handle unknown error type
		}
	}
};

/**
 * Register a new student
 */
export const registerStudent = async (studentData: any) => {
	try {
		const response = await registerStudentService(studentData);
		return response; // Feedback from the service
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message); // Pass error to be handled in the route
		} else {
			throw new Error('An unknown error occurred'); // Handle unknown error type
		}
	}
};

/**
 * Register a new parent
 */
export const registerParent = async (parentData: any) => {
	try {
		const response = await registerParentService(parentData);
		return response; // Feedback from the service
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message); // Pass error to be handled in the route
		} else {
			throw new Error('An unknown error occurred'); // Handle unknown error type
		}
	}
};

/**
 * Get all teachers
 */
export const getAllTeachers = async () => {
	try {
		const response = await getAllTeachersService();
		return response; // Feedback from the service
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message); // Pass error to be handled in the route
		} else {
			throw new Error('An unknown error occurred'); // Handle unknown error type
		}
	}
};

/**
 * Get all students
 */
export const getAllStudents = async () => {
	try {
		const response = await getAllStudentsService();
		return response; // Feedback from the service
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message); // Pass error to be handled in the route
		} else {
			throw new Error('An unknown error occurred'); // Handle unknown error type
		}
	}
};

/**
 * Get all parents
 */
export const getAllParents = async () => {
	try {
		const response = await getAllParentsService();
		return response; // Feedback from the service
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message); // Pass error to be handled in the route
		} else {
			throw new Error('An unknown error occurred'); // Handle unknown error type
		}
	}
};
