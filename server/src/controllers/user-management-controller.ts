import {
	registerTeacherService,
	registerStudentService,
	registerParentService,
	getAllTeachersService,
	getAllStudentsService,
	getAllParentsService,
	updateTeacherService,
	updateStudentService,
	updateParentService,
	updateUserStatusService,
	getTeacherByIdService,
	getStudentByIdService,
	getParentByIdService,
	deleteTeacherService,
	deleteStudentService,
	deleteParentService,
	getUserRolesService,
} from '../services/user-management-services';

/**
 * Register a new teacher
 */
export const registerTeacher = async (teacherData: any) => {
	try {
		const teacher = await registerTeacherService(teacherData);
		return teacher;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Register a new student
 */
export const registerStudent = async (studentData: any) => {
	try {
		const student = await registerStudentService(studentData);
		return student;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Register a new parent
 */
export const registerParent = async (parentData: any) => {
	try {
		const parent = await registerParentService(parentData);
		return parent;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Get all teachers
 */
export const getAllTeachers = async () => {
	try {
		const teachers = await getAllTeachersService();
		return teachers;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Get teacher by ID
 */
export const getTeacherById = async (teacherId: string) => {
	try {
		const teacher = await getTeacherByIdService(teacherId);
		return teacher;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Get all students
 */
export const getAllStudents = async () => {
	try {
		const students = await getAllStudentsService();
		return students;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Get student by ID
 */
export const getStudentById = async (studentId: string) => {
	try {
		const student = await getStudentByIdService(studentId);
		return student;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Get all parents
 */
export const getAllParents = async () => {
	try {
		const parents = await getAllParentsService();
		return parents;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Get parent by ID
 */
export const getParentById = async (parentId: string) => {
	try {
		const parent = await getParentByIdService(parentId);
		return parent;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Update teacher
 */
export const editTeacher = async (teacherData: any) => {
	try {
		const updatedTeacher = await updateTeacherService(
			teacherData.teacherId,
			teacherData
		);
		return updatedTeacher;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Update student
 */
export const editStudent = async (studentData: any) => {
	try {
		const updatedStudent = await updateStudentService(
			studentData.studentId,
			studentData
		);
		return updatedStudent;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Update parent
 */
export const editParent = async (parentData: any) => {
	try {
		const updatedParent = await updateParentService(
			parentData.parentId,
			parentData
		);
		return updatedParent;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Delete teacher
 */
export const deleteTeacher = async (teacherId: string) => {
	try {
		await deleteTeacherService(teacherId);
		return { success: true, message: 'Teacher deleted successfully' };
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Delete student
 */
export const deleteStudent = async (studentId: string) => {
	try {
		await deleteStudentService(studentId);
		return { success: true, message: 'Student deleted successfully' };
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Delete parent
 */
export const deleteParent = async (parentId: string) => {
	try {
		await deleteParentService(parentId);
		return { success: true, message: 'Parent deleted successfully' };
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Update user status
 */
export const updateUserStatusController = async (
	userId: string,
	role: 'teacher' | 'student' | 'parent',
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedUser = await updateUserStatusService(userId, role, status);
		return updatedUser;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
// Update Teacher Status
export const updateTeacherController = async (
	teacherId: string,
	teacherData: any
) => {
	try {
		const updatedTeacher = await updateTeacherService(teacherId, teacherData);
		return updatedTeacher;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Get user roles
 */
export const getUserRoles = async () => {
	try {
		const roles = await getUserRolesService();
		return roles;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
