import { Error } from 'mongoose';
import {
	addGradeService,
	getAllGradesService,
	getGradeByIdService,
	updateGradeStatusService,
	updateGradeService,
	deleteGradeService,
	addSubjectService,
	getAllSubjectsService,
	getSubjectByIdService,
	updateSubjectStatusService,
	updateSubjectService,
	deleteSubjectService,
	addGradeSubjectService,
	getAllGradeSubjectsService,
	getGradeSubjectByIdService,
	updateGradeSubjectStatusService,
	updateGradeSubjectService,
	deleteGradeSubjectService,
	addStudentSubjectService,
	getAllStudentSubjectsService,
	updateStudentSubjectStatusService,
	recordAttendanceService,
	getAllAttendanceService,
	updateAttendanceStatusService,
	addAssignmentService,
	getAllAssignmentsService,
	getAssignmentByIdService,
	updateAssignmentService,
	deleteAssignmentService,
	addQuizService,
	getAllQuizzesService,
	getQuizByIdService,
	updateQuizService,
	deleteQuizService,
	addQuizStudentService,
	getAllQuizStudentsService,
	getQuizStudentByIdService,
	updateQuizStudentService,
	addNoteService,
	getAllNotesService,
	getNoteByIdService,
} from '../services/tuition-services';

// --- Grades ---
export const addGradeController = async (gradeData: any) => {
	try {
		const newGrade = await addGradeService(gradeData);
		return { success: true, data: newGrade };
	} catch (error: any) {
		throw new Error(`Failed to add grade: ${error.message}`);
	}
};

export const getAllGradesController = async () => {
	try {
		const grades = await getAllGradesService();
		return { success: true, data: grades };
	} catch (error: any) {
		throw new Error(`Failed to fetch grades: ${error.message}`);
	}
};

export const getGradeByIdController = async (gradeId: string) => {
	try {
		const grade = await getGradeByIdService(gradeId);
		return { success: true, data: grade };
	} catch (error: any) {
		throw new Error(`Failed to fetch grade: ${error.message}`);
	}
};

export const updateGradeStatusController = async (
	gradeId: string,
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedGrade = await updateGradeStatusService(gradeId, status);
		return { success: true, data: updatedGrade };
	} catch (error: any) {
		throw new Error(`Failed to update grade status: ${error.message}`);
	}
};

export const updateGradeController = async (
	gradeId: string,
	gradeData: any
) => {
	try {
		const updatedGrade = await updateGradeService(gradeId, gradeData);
		return { success: true, data: updatedGrade };
	} catch (error: any) {
		throw new Error(`Failed to update grade: ${error.message}`);
	}
};

export const deleteGradeController = async (gradeId: string) => {
	try {
		await deleteGradeService(gradeId);
		return { success: true, message: 'Grade deleted successfully' };
	} catch (error: any) {
		throw new Error(`Failed to delete grade: ${error.message}`);
	}
};

// --- Subjects ---
export const addSubjectController = async (subjectData: any) => {
	try {
		const newSubject = await addSubjectService(subjectData);
		return { success: true, data: newSubject };
	} catch (error: any) {
		throw new Error(`Failed to add subject: ${error.message}`);
	}
};

export const getAllSubjectsController = async () => {
	try {
		const subjects = await getAllSubjectsService();
		return { success: true, data: subjects };
	} catch (error: any) {
		throw new Error(`Failed to fetch subjects: ${error.message}`);
	}
};

export const getSubjectByIdController = async (subjectId: string) => {
	try {
		const subject = await getSubjectByIdService(subjectId);
		return { success: true, data: subject };
	} catch (error: any) {
		throw new Error(`Failed to fetch subject: ${error.message}`);
	}
};

export const updateSubjectStatusController = async (
	subjectId: string,
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedSubject = await updateSubjectStatusService(subjectId, status);
		return { success: true, data: updatedSubject };
	} catch (error: any) {
		throw new Error(`Failed to update subject status: ${error.message}`);
	}
};

export const updateSubjectController = async (
	subjectId: string,
	subjectData: any
) => {
	try {
		const updatedSubject = await updateSubjectService(subjectId, subjectData);
		return { success: true, data: updatedSubject };
	} catch (error: any) {
		throw new Error(`Failed to update subject: ${error.message}`);
	}
};

export const deleteSubjectController = async (subjectId: string) => {
	try {
		await deleteSubjectService(subjectId);
		return { success: true, message: 'Subject deleted successfully' };
	} catch (error: any) {
		throw new Error(`Failed to delete subject: ${error.message}`);
	}
};

// --- Grade-Subjects ---
export const addGradeSubjectController = async (gradeSubjectData: any) => {
	try {
		const newGradeSubject = await addGradeSubjectService(gradeSubjectData);
		return { success: true, data: newGradeSubject };
	} catch (error: any) {
		throw new Error(`Failed to add grade-subject: ${error.message}`);
	}
};

export const getAllGradeSubjectsController = async () => {
	try {
		const gradeSubjects = await getAllGradeSubjectsService();
		return { success: true, data: gradeSubjects };
	} catch (error: any) {
		throw new Error(`Failed to fetch grade-subjects: ${error.message}`);
	}
};

export const getGradeSubjectByIdController = async (gradeSubjectId: string) => {
	try {
		const gradeSubject = await getGradeSubjectByIdService(gradeSubjectId);
		return { success: true, data: gradeSubject };
	} catch (error: any) {
		throw new Error(`Failed to fetch grade-subject: ${error.message}`);
	}
};

export const updateGradeSubjectStatusController = async (
	gradeSubjectId: string,
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedGradeSubject = await updateGradeSubjectStatusService(
			gradeSubjectId,
			status
		);
		return { success: true, data: updatedGradeSubject };
	} catch (error: any) {
		throw new Error(`Failed to update grade-subject status: ${error.message}`);
	}
};

export const updateGradeSubjectController = async (
	gradeSubjectId: string,
	gradeSubjectData: any
) => {
	try {
		const updatedGradeSubject = await updateGradeSubjectService(
			gradeSubjectId,
			gradeSubjectData
		);
		return { success: true, data: updatedGradeSubject };
	} catch (error: any) {
		throw new Error(`Failed to update grade-subject: ${error.message}`);
	}
};

export const deleteGradeSubjectController = async (gradeSubjectId: string) => {
	try {
		await deleteGradeSubjectService(gradeSubjectId);
		return { success: true, message: 'Grade-subject deleted successfully' };
	} catch (error: any) {
		throw new Error(`Failed to delete grade-subject: ${error.message}`);
	}
};

// --- Student-Subjects ---
export const addStudentSubjectController = async (studentSubjectData: any) => {
	try {
		const newStudentSubject = await addStudentSubjectService(
			studentSubjectData
		);
		return { success: true, data: newStudentSubject };
	} catch (error: any) {
		throw new Error(`Failed to add student-subject: ${error.message}`);
	}
};

export const getAllStudentSubjectsController = async () => {
	try {
		const studentSubjects = await getAllStudentSubjectsService();
		return { success: true, data: studentSubjects };
	} catch (error: any) {
		throw new Error(`Failed to fetch student-subjects: ${error.message}`);
	}
};

export const updateStudentSubjectStatusController = async (
	studentSubjectId: string,
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedStudentSubject = await updateStudentSubjectStatusService(
			studentSubjectId,
			status
		);
		return { success: true, data: updatedStudentSubject };
	} catch (error: any) {
		throw new Error(
			`Failed to update student-subject status: ${error.message}`
		);
	}
};

// --- Attendance ---
export const recordAttendanceController = async (attendanceData: any) => {
	try {
		const newAttendance = await recordAttendanceService(attendanceData);
		return { success: true, data: newAttendance };
	} catch (error: any) {
		throw new Error(`Failed to record attendance: ${error.message}`);
	}
};

export const getAllAttendanceController = async () => {
	try {
		const attendanceRecords = await getAllAttendanceService();
		return { success: true, data: attendanceRecords };
	} catch (error: any) {
		throw new Error(`Failed to fetch attendance records: ${error.message}`);
	}
};

export const updateAttendanceStatusController = async (
	attendanceId: string,
	status: 'Present' | 'Absent' | 'Late'
) => {
	try {
		const updatedAttendance = await updateAttendanceStatusService(
			attendanceId,
			status
		);
		return { success: true, data: updatedAttendance };
	} catch (error: any) {
		throw new Error(`Failed to update attendance status: ${error.message}`);
	}
};

// --- Assignments ---
export const addAssignmentController = async (assignmentData: any) => {
	try {
		const newAssignment = await addAssignmentService(assignmentData);
		return { success: true, data: newAssignment };
	} catch (error: any) {
		throw new Error(`Failed to add assignment: ${error.message}`);
	}
};

export const getAllAssignmentsController = async () => {
	try {
		const assignments = await getAllAssignmentsService();
		return { success: true, data: assignments };
	} catch (error: any) {
		throw new Error(`Failed to fetch assignments: ${error.message}`);
	}
};

export const getAssignmentByIdController = async (assignmentId: string) => {
	try {
		const assignment = await getAssignmentByIdService(assignmentId);
		return { success: true, data: assignment };
	} catch (error: any) {
		throw new Error(`Failed to fetch assignment: ${error.message}`);
	}
};

export const updateAssignmentController = async (
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
		throw new Error(`Failed to update assignment: ${error.message}`);
	}
};

export const deleteAssignmentController = async (assignmentId: string) => {
	try {
		await deleteAssignmentService(assignmentId);
		return { success: true, message: 'Assignment deleted successfully' };
	} catch (error: any) {
		throw new Error(`Failed to delete assignment: ${error.message}`);
	}
};

// --- Quizzes ---
export const addQuizController = async (quizData: any) => {
	try {
		const newQuiz = await addQuizService(quizData);
		return { success: true, data: newQuiz };
	} catch (error: any) {
		throw new Error(`Failed to add quiz: ${error.message}`);
	}
};

export const getAllQuizzesController = async () => {
	try {
		const quizzes = await getAllQuizzesService();
		return { success: true, data: quizzes };
	} catch (error: any) {
		throw new Error(`Failed to fetch quizzes: ${error.message}`);
	}
};

export const getQuizByIdController = async (quizId: string) => {
	try {
		const quiz = await getQuizByIdService(quizId);
		return { success: true, data: quiz };
	} catch (error: any) {
		throw new Error(`Failed to fetch quiz: ${error.message}`);
	}
};

export const updateQuizController = async (quizId: string, quizData: any) => {
	try {
		const updatedQuiz = await updateQuizService(quizId, quizData);
		return { success: true, data: updatedQuiz };
	} catch (error: any) {
		throw new Error(`Failed to update quiz: ${error.message}`);
	}
};

export const deleteQuizController = async (quizId: string) => {
	try {
		await deleteQuizService(quizId);
		return { success: true, message: 'Quiz deleted successfully' };
	} catch (error: any) {
		throw new Error(`Failed to delete quiz: ${error.message}`);
	}
};

// --- Quiz-Students ---
export const addQuizStudentController = async (quizStudentData: any) => {
	try {
		const newQuizStudent = await addQuizStudentService(quizStudentData);
		return { success: true, data: newQuizStudent };
	} catch (error: any) {
		throw new Error(`Failed to add quiz-student record: ${error.message}`);
	}
};

export const getAllQuizStudentsController = async () => {
	try {
		const quizStudents = await getAllQuizStudentsService();
		return { success: true, data: quizStudents };
	} catch (error: any) {
		throw new Error(`Failed to fetch quiz-students: ${error.message}`);
	}
};

export const getQuizStudentByIdController = async (quizStudentId: string) => {
	try {
		const quizStudent = await getQuizStudentByIdService(quizStudentId);
		return { success: true, data: quizStudent };
	} catch (error: any) {
		throw new Error(`Failed to fetch quiz-student: ${error.message}`);
	}
};

export const updateQuizStudentController = async (
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
		throw new Error(`Failed to update quiz-student: ${error.message}`);
	}
};

// --- Notes ---
export const addNoteController = async (noteData: any) => {
	try {
		const newNote = await addNoteService(noteData);
		return { success: true, data: newNote };
	} catch (error: any) {
		throw new Error(`Failed to add note: ${error.message}`);
	}
};

export const getAllNotesController = async () => {
	try {
		const notes = await getAllNotesService();
		return { success: true, data: notes };
	} catch (error: any) {
		throw new Error(`Failed to fetch notes: ${error.message}`);
	}
};

export const getNoteByIdController = async (noteId: string) => {
	try {
		const note = await getNoteByIdService(noteId);
		return { success: true, data: note };
	} catch (error: any) {
		throw new Error(`Failed to fetch note: ${error.message}`);
	}
};
