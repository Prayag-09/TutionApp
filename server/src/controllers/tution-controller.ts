import {
	addGradeService,
	getAllGradesService,
	getGradeByIdService,
	updateGradeStatusService,
	updateGradeService,
	deleteGradeService,
	addGradeSubjectService,
	getAllGradeSubjectsService,
	getGradeSubjectByIdService,
	updateGradeSubjectStatusService,
	updateGradeSubjectService,
	deleteGradeSubjectService,
	addSubjectService,
	getAllSubjectsService,
	getSubjectByIdService,
	updateSubjectStatusService,
	updateSubjectService,
	deleteSubjectService,
	addStudentSubjectService,
	getAllStudentSubjectsService,
	updateStudentSubjectStatusService,
	recordAttendanceService,
	getAllAttendanceService,
	updateAttendanceStatusService,
	addAssignmentService,
	addQuizService,
	addQuizStudentService,
	deleteAssignmentService,
	deleteQuizService,
	getAllAssignmentsService,
	getAllQuizStudentsService,
	getAllQuizzesService,
	getAssignmentByIdService,
	getQuizByIdService,
	getQuizStudentByIdService,
	updateAssignmentService,
	updateQuizService,
	updateQuizStudentService,
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

// Get a single grade by ID (GET)
export const getGradeById = async (gradeId: string) => {
	try {
		const grade = await getGradeByIdService(gradeId);
		return { success: true, data: grade };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update grade status (PUT)
export const updateGradeStatus = async (gradeId: string, status: string) => {
	try {
		const updatedGrade = await updateGradeStatusService(gradeId, status);
		return { success: true, data: updatedGrade };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update grade details (PUT)
export const updateGrade = async (gradeId: string, gradeData: any) => {
	try {
		const updatedGrade = await updateGradeService(gradeId, gradeData);
		return { success: true, data: updatedGrade };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Delete a grade (DELETE)
export const deleteGrade = async (gradeId: string) => {
	try {
		await deleteGradeService(gradeId);
		return { success: true, message: 'Grade deleted successfully' };
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

// Get a single grade-subject relation by ID (GET)
export const getGradeSubjectById = async (gradeSubjectId: string) => {
	try {
		const gradeSubject = await getGradeSubjectByIdService(gradeSubjectId);
		return { success: true, data: gradeSubject };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update grade-subject status (PUT)
export const updateGradeSubjectStatus = async (
	gradeSubjectId: string,
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

// Update grade-subject relation (PUT)
export const updateGradeSubject = async (gradeSubjectId: string, data: any) => {
	try {
		const updatedRelation = await updateGradeSubjectService(
			gradeSubjectId,
			data
		);
		return { success: true, data: updatedRelation };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Delete a grade-subject relation (DELETE)
export const deleteGradeSubject = async (gradeSubjectId: string) => {
	try {
		await deleteGradeSubjectService(gradeSubjectId);
		return {
			success: true,
			message: 'Grade-Subject relation deleted successfully',
		};
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

// Get a single subject by ID (GET)
export const getSubjectById = async (subjectId: string) => {
	try {
		const subject = await getSubjectByIdService(subjectId);
		return { success: true, data: subject };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update subject status (PUT)
export const updateSubjectStatus = async (
	subjectId: string,
	status: string
) => {
	try {
		const updatedSubject = await updateSubjectStatusService(subjectId, status);
		return { success: true, data: updatedSubject };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update subject details (PUT)
export const updateSubject = async (subjectId: string, data: any) => {
	try {
		const updatedSubject = await updateSubjectService(subjectId, data);
		return { success: true, data: updatedSubject };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Delete a subject (DELETE)
export const deleteSubject = async (subjectId: string) => {
	try {
		await deleteSubjectService(subjectId);
		return { success: true, message: 'Subject deleted successfully' };
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
	studentSubjectId: string,
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
	attendanceId: string,
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

/* ---------- Assignments ---------- */
// Add new assignment (POST)
export const addAssignment = async (assignmentData: any) => {
	try {
		const newAssignment = await addAssignmentService(assignmentData);
		return { success: true, data: newAssignment };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all assignments (GET)
export const getAllAssignments = async () => {
	try {
		const assignments = await getAllAssignmentsService();
		return { success: true, data: assignments };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get a single assignment by ID (GET)
export const getAssignmentById = async (assignmentId: string) => {
	try {
		const assignment = await getAssignmentByIdService(assignmentId);
		return { success: true, data: assignment };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update assignment details (PUT)
export const updateAssignment = async (
	assignmentId: string,
	assignmentData: any
) => {
	try {
		const updatedAssignment = await updateAssignmentService(
			assignmentId,
			assignmentData
		);
		return { success: true, data: updatedAssignment };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Delete an assignment (DELETE)
export const deleteAssignment = async (assignmentId: string) => {
	try {
		await deleteAssignmentService(assignmentId);
		return { success: true, message: 'Assignment deleted successfully' };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

/* ---------- Quizzes ---------- */
// Add new quiz (POST)
export const addQuiz = async (quizData: any) => {
	try {
		const newQuiz = await addQuizService(quizData);
		return { success: true, data: newQuiz };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all quizzes (GET)
export const getAllQuizzes = async () => {
	try {
		const quizzes = await getAllQuizzesService();
		return { success: true, data: quizzes };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get a single quiz by ID (GET)
export const getQuizById = async (quizId: string) => {
	try {
		const quiz = await getQuizByIdService(quizId);
		return { success: true, data: quiz };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update quiz details (PUT)
export const updateQuiz = async (quizId: string, quizData: any) => {
	try {
		const updatedQuiz = await updateQuizService(quizId, quizData);
		return { success: true, data: updatedQuiz };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Delete a quiz (DELETE)
export const deleteQuiz = async (quizId: string) => {
	try {
		await deleteQuizService(quizId);
		return { success: true, message: 'Quiz deleted successfully' };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

/* ---------- QuizStudent ---------- */
// Add new quiz-student record (POST)
export const addQuizStudent = async (quizStudentData: any) => {
	try {
		const newQuizStudent = await addQuizStudentService(quizStudentData);
		return { success: true, data: newQuizStudent };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get all quiz-student records (GET)
export const getAllQuizStudents = async () => {
	try {
		const quizStudents = await getAllQuizStudentsService();
		return { success: true, data: quizStudents };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Get a single quiz-student record by ID (GET)
export const getQuizStudentById = async (quizStudentId: string) => {
	try {
		const quizStudent = await getQuizStudentByIdService(quizStudentId);
		return { success: true, data: quizStudent };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};

// Update quiz-student details (PUT)
export const updateQuizStudent = async (
	quizStudentId: string,
	quizStudentData: any
) => {
	try {
		const updatedQuizStudent = await updateQuizStudentService(
			quizStudentId,
			quizStudentData
		);
		return { success: true, data: updatedQuizStudent };
	} catch (error: any) {
		return { success: false, data: error.message };
	}
};
