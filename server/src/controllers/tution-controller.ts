import {
	addGradeService,
	getAllGradesService,
	updateGradeStatusService,
	addGradeSubjectService,
	getAllGradeSubjectsService,
	updateGradeSubjectStatusService,
	addSubjectService,
	getAllSubjectsService,
	updateSubjectStatusService,
	addStudentSubjectService,
	getAllStudentSubjectsService,
	updateStudentSubjectStatusService,
	recordAttendanceService,
	getAllAttendanceService,
	updateAttendanceStatusService,
} from '../services/tution-services';

/* ---------- Grades ---------- */
// Add new grade (POST)
export const addGrade = async (gradeData: any) => {
	try {
		const newGrade = await addGradeService(gradeData);
		return { success: true, data: newGrade };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all grades (GET)
export const getAllGrades = async () => {
	try {
		const grades = await getAllGradesService();
		return { success: true, data: grades };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update grade status (PUT)
export const updateGradeStatus = async (gradeId: any, status: string) => {
	try {
		const updatedGrade = await updateGradeStatusService(gradeId, status);
		return { success: true, data: updatedGrade };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

/* ---------- Grade-Subject ---------- */
// Add new grade-subject (POST)
export const addGradeSubject = async (data: any) => {
	try {
		const newRelation = await addGradeSubjectService(data);
		return { success: true, data: newRelation };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all grade-subject relations (GET)
export const getAllGradeSubjects = async () => {
	try {
		const gradeSubjects = await getAllGradeSubjectsService();
		return { success: true, data: gradeSubjects };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update grade-subject status (PUT)
export const updateGradeSubjectStatus = async (
	gradeSubjectId: any,
	status: string
) => {
	try {
		const updatedRelation = await updateGradeSubjectStatusService(
			gradeSubjectId,
			status
		);
		return { success: true, data: updatedRelation };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

/* ---------- Subjects ---------- */
// Add new subject (POST)
export const addSubject = async (data: any) => {
	try {
		const newSubject = await addSubjectService(data);
		return { success: true, data: newSubject };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all subjects (GET)
export const getAllSubjects = async () => {
	try {
		const subjects = await getAllSubjectsService();
		return { success: true, data: subjects };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update subject status (PUT)
export const updateSubjectStatus = async (
	subjectId: any,
	status: string
) => {
	try {
		const updatedSubject = await updateSubjectStatusService(subjectId, status);
		return { success: true, data: updatedSubject };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

/* ---------- Student-Subject ---------- */
// Add new student-subject (POST)
export const addStudentSubject = async (data: any) => {
	try {
		const newRelation = await addStudentSubjectService(data);
		return { success: true, data: newRelation };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all student-subject relations (GET)
export const getAllStudentSubjects = async () => {
	try {
		const studentSubjects = await getAllStudentSubjectsService();
		return { success: true, data: studentSubjects };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update student-subject status (PUT)
export const updateStudentSubjectStatus = async (
	studentSubjectId: any,
	status: string
) => {
	try {
		const updatedRelation = await updateStudentSubjectStatusService(
			studentSubjectId,
			status
		);
		return { success: true, data: updatedRelation };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

/* ---------- Attendance ---------- */
// Record attendance (POST)
export const recordAttendance = async (data: any) => {
	try {
		const newAttendance = await recordAttendanceService(data);
		return { success: true, data: newAttendance };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all attendance records (GET)
export const getAllAttendance = async () => {
	try {
		const attendanceRecords = await getAllAttendanceService();
		return { success: true, data: attendanceRecords };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update attendance status (PUT)
export const updateAttendanceStatus = async (
	attendanceId: any,
	status: string
) => {
	try {
		const updatedAttendance = await updateAttendanceStatusService(
			attendanceId,
			status
		);
		return { success: true, data: updatedAttendance };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};
