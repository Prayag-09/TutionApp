import { Types } from 'mongoose';
import { Grade } from '../models/Grade';
import { GradeSubject } from '../models/GradeSubject';
import { Subject } from '../models/Subject';
import { StudentSubject } from '../models/StudentSubject';
import { Attendance } from '../models/Attendance';
import { Assignment } from '../models/Assignment';
import { Quiz } from '../models/Quiz';
import { QuizStudent } from '../models/QuizStudent';

// Utility function for handling errors
const handleServiceError = (error: any, message: string) => {
	console.error(error);
	return {
		success: false,
		error: error.message || message,
		details: error.details || [],
	};
};

/* ---------- Grades ---------- */
export const addGradeService = async (data: { name: string }) => {
	try {
		// Check if the grade already exists
		const existingGrade = await Grade.findOne({ name: data.name });
		if (existingGrade) {
			throw new Error('Grade already exists');
		}

		const grade = await Grade.create(data);
		return { success: true, data: grade };
	} catch (error) {
		return handleServiceError(error, 'Failed to add grade');
	}
};

export const getAllGradesService = async () => {
	try {
		const grades = await Grade.find();
		return { success: true, data: grades };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch grades');
	}
};

export const getGradeByIdService = async (gradeId: string) => {
	try {
		const grade = await Grade.findById(gradeId);
		if (!grade) throw new Error('Grade not found');
		return { success: true, data: grade };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch grade');
	}
};

export const updateGradeStatusService = async (
	gradeId: string,
	status: string
) => {
	try {
		const updatedGrade = await Grade.findByIdAndUpdate(
			gradeId,
			{ status },
			{ new: true }
		);
		if (!updatedGrade) throw new Error('Grade not found');
		return { success: true, data: updatedGrade };
	} catch (error) {
		return handleServiceError(error, 'Failed to update grade status');
	}
};

export const updateGradeService = async (gradeId: string, data: any) => {
	try {
		const updatedGrade = await Grade.findByIdAndUpdate(
			gradeId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedGrade) throw new Error('Grade not found');
		return { success: true, data: updatedGrade };
	} catch (error) {
		return handleServiceError(error, 'Failed to update grade');
	}
};

export const deleteGradeService = async (gradeId: string) => {
	try {
		const grade = await Grade.findByIdAndDelete(gradeId);
		if (!grade) throw new Error('Grade not found');
		return { success: true };
	} catch (error) {
		return handleServiceError(error, 'Failed to delete grade');
	}
};

/* ---------- Grade-Subject ---------- */
export const addGradeSubjectService = async (data: {
	gradeId: Types.ObjectId;
	subjectId: Types.ObjectId;
}) => {
	try {
		const existingRelation = await GradeSubject.findOne(data);
		if (existingRelation) {
			throw new Error('This subject is already assigned to the grade');
		}

		const gradeSubject = await GradeSubject.create(data);
		return { success: true, data: gradeSubject };
	} catch (error) {
		return handleServiceError(error, 'Failed to add grade-subject relation');
	}
};

export const getAllGradeSubjectsService = async () => {
	try {
		const gradeSubjects = await GradeSubject.find().populate(
			'gradeId subjectId'
		);
		return { success: true, data: gradeSubjects };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch grade-subject relations');
	}
};

export const getGradeSubjectByIdService = async (gradeSubjectId: string) => {
	try {
		const gradeSubject = await GradeSubject.findById(gradeSubjectId).populate(
			'gradeId subjectId'
		);
		if (!gradeSubject) throw new Error('Grade-Subject relation not found');
		return { success: true, data: gradeSubject };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch grade-subject relation');
	}
};

export const updateGradeSubjectStatusService = async (
	gradeSubjectId: string,
	status: string
) => {
	try {
		const updatedRelation = await GradeSubject.findByIdAndUpdate(
			gradeSubjectId,
			{ status },
			{ new: true }
		);
		if (!updatedRelation) throw new Error('Grade-Subject relation not found');
		return { success: true, data: updatedRelation };
	} catch (error) {
		return handleServiceError(error, 'Failed to update grade-subject status');
	}
};

export const updateGradeSubjectService = async (
	gradeSubjectId: string,
	data: any
) => {
	try {
		const updatedRelation = await GradeSubject.findByIdAndUpdate(
			gradeSubjectId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedRelation) throw new Error('Grade-Subject relation not found');
		return { success: true, data: updatedRelation };
	} catch (error) {
		return handleServiceError(error, 'Failed to update grade-subject relation');
	}
};

export const deleteGradeSubjectService = async (gradeSubjectId: string) => {
	try {
		const gradeSubject = await GradeSubject.findByIdAndDelete(gradeSubjectId);
		if (!gradeSubject) throw new Error('Grade-Subject relation not found');
		return { success: true };
	} catch (error) {
		return handleServiceError(error, 'Failed to delete grade-subject relation');
	}
};

/* ---------- Subjects ---------- */
export const addSubjectService = async (data: { name: string }) => {
	try {
		const existingSubject = await Subject.findOne({ name: data.name });
		if (existingSubject) {
			throw new Error('Subject already exists');
		}

		const subject = await Subject.create(data);
		return { success: true, data: subject };
	} catch (error) {
		return handleServiceError(error, 'Failed to add subject');
	}
};

export const getAllSubjectsService = async () => {
	try {
		const subjects = await Subject.find();
		return { success: true, data: subjects };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch subjects');
	}
};

export const getSubjectByIdService = async (subjectId: string) => {
	try {
		const subject = await Subject.findById(subjectId);
		if (!subject) throw new Error('Subject not found');
		return { success: true, data: subject };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch subject');
	}
};

export const updateSubjectStatusService = async (
	subjectId: string,
	status: string
) => {
	try {
		const updatedSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{ status },
			{ new: true }
		);
		if (!updatedSubject) throw new Error('Subject not found');
		return { success: true, data: updatedSubject };
	} catch (error) {
		return handleServiceError(error, 'Failed to update subject status');
	}
};

export const updateSubjectService = async (subjectId: string, data: any) => {
	try {
		const updatedSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedSubject) throw new Error('Subject not found');
		return { success: true, data: updatedSubject };
	} catch (error) {
		return handleServiceError(error, 'Failed to update subject');
	}
};

export const deleteSubjectService = async (subjectId: string) => {
	try {
		const subject = await Subject.findByIdAndDelete(subjectId);
		if (!subject) throw new Error('Subject not found');
		return { success: true };
	} catch (error) {
		return handleServiceError(error, 'Failed to delete subject');
	}
};

/* ---------- Student-Subject ---------- */
export const addStudentSubjectService = async (data: {
	studentId: Types.ObjectId;
	subjectId: Types.ObjectId;
}) => {
	try {
		const existingRelation = await StudentSubject.findOne(data);
		if (existingRelation) {
			throw new Error('Student is already enrolled in this subject');
		}

		const studentSubject = await StudentSubject.create(data);
		return { success: true, data: studentSubject };
	} catch (error) {
		return handleServiceError(error, 'Failed to add student-subject relation');
	}
};

export const getAllStudentSubjectsService = async () => {
	try {
		const studentSubjects = await StudentSubject.find().populate(
			'studentId subjectId'
		);
		return { success: true, data: studentSubjects };
	} catch (error) {
		return handleServiceError(
			error,
			'Failed to fetch student-subject relations'
		);
	}
};

export const updateStudentSubjectStatusService = async (
	studentSubjectId: string,
	status: string
) => {
	try {
		const updatedRelation = await StudentSubject.findByIdAndUpdate(
			studentSubjectId,
			{ status },
			{ new: true }
		);
		if (!updatedRelation) throw new Error('Student-Subject relation not found');
		return { success: true, data: updatedRelation };
	} catch (error) {
		return handleServiceError(error, 'Failed to update student-subject status');
	}
};

/* ---------- Attendance ---------- */
export const recordAttendanceService = async (data: {
	studentId: Types.ObjectId;
	status: string;
	date: Date;
}) => {
	try {
		const existingAttendance = await Attendance.findOne({
			studentId: data.studentId,
			date: data.date,
		});
		if (existingAttendance) {
			throw new Error(
				'Attendance for this student on this date already exists'
			);
		}

		const attendance = await Attendance.create(data);
		return { success: true, data: attendance };
	} catch (error) {
		return handleServiceError(error, 'Failed to record attendance');
	}
};

export const getAllAttendanceService = async () => {
	try {
		const attendanceRecords = await Attendance.find().populate('studentId');
		return { success: true, data: attendanceRecords };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch attendance records');
	}
};

export const updateAttendanceStatusService = async (
	attendanceId: string,
	status: string
) => {
	try {
		const updatedAttendance = await Attendance.findByIdAndUpdate(
			attendanceId,
			{ status },
			{ new: true }
		);
		if (!updatedAttendance) throw new Error('Attendance record not found');
		return { success: true, data: updatedAttendance };
	} catch (error) {
		return handleServiceError(error, 'Failed to update attendance status');
	}
};
/* ---------- Assignments ---------- */
export const addAssignmentService = async (data: {
	name: string;
	gradeSubjectId: Types.ObjectId;
	teacherId: Types.ObjectId;
	details: string;
	file?: string;
	maximumMark: number;
}) => {
	try {
		const assignment = await Assignment.create(data);
		return { success: true, data: assignment };
	} catch (error) {
		return handleServiceError(error, 'Failed to add assignment');
	}
};

export const getAllAssignmentsService = async () => {
	try {
		const assignments = await Assignment.find()
			.populate('gradeSubjectId')
			.populate('teacherId');
		return { success: true, data: assignments };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch assignments');
	}
};

export const getAssignmentByIdService = async (assignmentId: string) => {
	try {
		const assignment = await Assignment.findById(assignmentId)
			.populate('gradeSubjectId')
			.populate('teacherId');
		if (!assignment) throw new Error('Assignment not found');
		return { success: true, data: assignment };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch assignment');
	}
};

export const updateAssignmentService = async (
	assignmentId: string,
	data: any
) => {
	try {
		const updatedAssignment = await Assignment.findByIdAndUpdate(
			assignmentId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedAssignment) throw new Error('Assignment not found');
		return { success: true, data: updatedAssignment };
	} catch (error) {
		return handleServiceError(error, 'Failed to update assignment');
	}
};

export const deleteAssignmentService = async (assignmentId: string) => {
	try {
		const assignment = await Assignment.findByIdAndDelete(assignmentId);
		if (!assignment) throw new Error('Assignment not found');
		return { success: true };
	} catch (error) {
		return handleServiceError(error, 'Failed to delete assignment');
	}
};

/* ---------- Quizzes ---------- */
export const addQuizService = async (data: {
	name: string;
	gradeSubjectId: Types.ObjectId;
	teacherId: Types.ObjectId;
	timeLimit?: number;
	maxMark?: number;
	questions: { question: string; options: string[]; correctOption: string }[];
}) => {
	try {
		const quiz = await Quiz.create(data);
		return { success: true, data: quiz };
	} catch (error) {
		return handleServiceError(error, 'Failed to add quiz');
	}
};

export const getAllQuizzesService = async () => {
	try {
		const quizzes = await Quiz.find()
			.populate('gradeSubjectId')
			.populate('teacherId');
		return { success: true, data: quizzes };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch quizzes');
	}
};

export const getQuizByIdService = async (quizId: string) => {
	try {
		const quiz = await Quiz.findById(quizId)
			.populate('gradeSubjectId')
			.populate('teacherId');
		if (!quiz) throw new Error('Quiz not found');
		return { success: true, data: quiz };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch quiz');
	}
};

export const updateQuizService = async (quizId: string, data: any) => {
	try {
		const updatedQuiz = await Quiz.findByIdAndUpdate(
			quizId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedQuiz) throw new Error('Quiz not found');
		return { success: true, data: updatedQuiz };
	} catch (error) {
		return handleServiceError(error, 'Failed to update quiz');
	}
};

export const deleteQuizService = async (quizId: string) => {
	try {
		const quiz = await Quiz.findByIdAndDelete(quizId);
		if (!quiz) throw new Error('Quiz not found');
		return { success: true };
	} catch (error) {
		return handleServiceError(error, 'Failed to delete quiz');
	}
};

/* ---------- QuizStudent ---------- */
export const addQuizStudentService = async (data: {
	quizId: Types.ObjectId;
	studentId: Types.ObjectId;
	mark?: number;
}) => {
	try {
		const existingQuizStudent = await QuizStudent.findOne({
			quizId: data.quizId,
			studentId: data.studentId,
		});
		if (existingQuizStudent) {
			throw new Error('Student has already attempted this quiz');
		}

		const quizStudent = await QuizStudent.create(data);
		return { success: true, data: quizStudent };
	} catch (error) {
		return handleServiceError(error, 'Failed to add quiz-student record');
	}
};

export const getAllQuizStudentsService = async () => {
	try {
		const quizStudents = await QuizStudent.find()
			.populate('quizId')
			.populate('studentId');
		return { success: true, data: quizStudents };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch quiz-student records');
	}
};

export const getQuizStudentByIdService = async (quizStudentId: string) => {
	try {
		const quizStudent = await QuizStudent.findById(quizStudentId)
			.populate('quizId')
			.populate('studentId');
		if (!quizStudent) throw new Error('Quiz-Student record not found');
		return { success: true, data: quizStudent };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch quiz-student record');
	}
};

export const updateQuizStudentService = async (
	quizStudentId: string,
	data: any
) => {
	try {
		const updatedQuizStudent = await QuizStudent.findByIdAndUpdate(
			quizStudentId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedQuizStudent) throw new Error('Quiz-Student record not found');
		return { success: true, data: updatedQuizStudent };
	} catch (error) {
		return handleServiceError(error, 'Failed to update quiz-student record');
	}
};
