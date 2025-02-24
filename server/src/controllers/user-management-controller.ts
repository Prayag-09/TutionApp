import {
	registerTeacherService,
	registerStudentService,
	registerParentService,
	getAllTeachersService,
	getAllStudentsService,
	getAllParentsService,
	updateTeacherService,
	updateStudentService,
	updateParentService

} from '../services/user-management-services';

/**
 * Register a new teacher
 */
export const registerTeacher = async (teacherData: any) => {
	try {
		const teacher = await registerTeacherService(teacherData);
		return { success: true, data: teacher };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

/**
 * Register a new student
 */
export const registerStudent = async (studentData: any) => {
	try {
		const student = await registerStudentService(studentData);
		return { success: true, data: student };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

/**
 * Register a new parent
 */
export const registerParent = async (parentData: any) => {
	try {
		const parent = await registerParentService(parentData);
		return { success: true, data: parent };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

/**
 * Get all teachers
 */
export const getAllTeachers = async () => {
	try {
		const teachers = await getAllTeachersService();
		return { success: true, data: teachers };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

/**
 * Get all students
 */
export const getAllStudents = async () => {
	try {
		const students = await getAllStudentsService();
		return { success: true, data: students };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

/**
 * Get all parents
 */
export const editTeacher = async (teacherData: any) => {
	try {
		const updatedTeacher = await updateTeacherService(teacherData.teacherId, teacherData);
		return { success: true, data: updatedTeacher };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

export const editStudent = async (studentData: any) => {
	try {
		const updatedStudent = await updateStudentService(studentData.studentId, studentData);
		return { success: true, data: updatedStudent };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

export const editParent = async (parentData: any) => {
	try {
		const updatedParent = await updateParentService(parentData.parentId, parentData);
		return { success: true, data: updatedParent };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};

export const getAllParents = async () => {
	try {
		const parents = await getAllParentsService();
		return { success: true, data: parents };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};
