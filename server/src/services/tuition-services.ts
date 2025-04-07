import { Types } from 'mongoose';
import { Grade } from '../models/Grade';
import { Subject } from '../models/Subject';
import { GradeSubject } from '../models/GradeSubject';
import { StudentSubject } from '../models/StudentSubject';
import { Attendance } from '../models/Attendance';
import { Assignment } from '../models/Assignment';
import { Quiz } from '../models/Quiz';
import { QuizStudent } from '../models/QuizStudent';
import Notes from '../models/Notes';

interface GradeData {
	name: string;
	status?: 'Live' | 'Archive';
}

interface SubjectData {
	name: string;
	status?: 'Live' | 'Archive';
}

interface GradeSubjectData {
	gradeId: Types.ObjectId;
	subjectId: Types.ObjectId;
	status?: 'Live' | 'Archive';
}

interface StudentSubjectData {
	studentId: Types.ObjectId;
	subjectId: Types.ObjectId;
	teacherId: Types.ObjectId;
	status?: 'Live' | 'Archive';
}

interface AttendanceData {
	student: Types.ObjectId;
	status: 'Present' | 'Absent' | 'Late';
	date: Date;
}

interface AssignmentData {
	name: string;
	gradeSubjectId: Types.ObjectId;
	teacherId: Types.ObjectId;
	details: string;
	file?: string;
	maximumMark: number;
	status?: 'Live' | 'Archive';
	dueDate: Date;
}

interface QuizData {
	name: string;
	gradeSubjectId: Types.ObjectId;
	teacherId: Types.ObjectId;
	timeLimit?: number;
	maxMark?: number;
	questions: { question: string; options: string[]; correctOption: string }[];
	status?: 'Live' | 'Archive';
}

interface QuizStudentData {
	quizId: Types.ObjectId;
	studentId: Types.ObjectId;
	mark?: number;
	status?: 'Attempted' | 'Not Attempted';
}

interface NoteData {
	title: string;
	gradeSubject: Types.ObjectId;
	teacher: Types.ObjectId;
	fileUrl: string;
	fileType: 'video' | 'audio' | 'text';
}

// --- Grades ---
export const addGradeService = async (data: GradeData) => {
	try {
		const existingGrade = await Grade.findOne({ name: data.name });
		if (existingGrade) throw new Error('Grade already exists');
		const grade = await Grade.create(data);
		return grade;
	} catch (error: any) {
		throw new Error(`Failed to add grade: ${error.message}`);
	}
};

export const getAllGradesService = async () => {
	try {
		const grades = await Grade.find();
		return grades;
	} catch (error: any) {
		throw new Error(`Failed to fetch grades: ${error.message}`);
	}
};

export const getGradeByIdService = async (gradeId: string) => {
	try {
		const grade = await Grade.findById(gradeId);
		if (!grade) throw new Error('Grade not found');
		return grade;
	} catch (error: any) {
		throw new Error(`Failed to fetch grade: ${error.message}`);
	}
};

export const updateGradeStatusService = async (
	gradeId: string,
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedGrade = await Grade.findByIdAndUpdate(
			gradeId,
			{ status },
			{ new: true }
		);
		if (!updatedGrade) throw new Error('Grade not found');
		return updatedGrade;
	} catch (error: any) {
		throw new Error(`Failed to update grade status: ${error.message}`);
	}
};

export const updateGradeService = async (
	gradeId: string,
	data: Partial<GradeData>
) => {
	try {
		const updatedGrade = await Grade.findByIdAndUpdate(
			gradeId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedGrade) throw new Error('Grade not found');
		return updatedGrade;
	} catch (error: any) {
		throw new Error(`Failed to update grade: ${error.message}`);
	}
};

export const deleteGradeService = async (gradeId: string) => {
	try {
		const grade = await Grade.findByIdAndDelete(gradeId);
		if (!grade) throw new Error('Grade not found');
		return grade;
	} catch (error: any) {
		throw new Error(`Failed to delete grade: ${error.message}`);
	}
};

// --- Subjects ---
export const addSubjectService = async (data: SubjectData) => {
	try {
		const existingSubject = await Subject.findOne({ name: data.name });
		if (existingSubject) throw new Error('Subject already exists');
		const subject = await Subject.create(data);
		return subject;
	} catch (error: any) {
		throw new Error(`Failed to add subject: ${error.message}`);
	}
};

export const getAllSubjectsService = async () => {
	try {
		const subjects = await Subject.find();
		return subjects;
	} catch (error: any) {
		throw new Error(`Failed to fetch subjects: ${error.message}`);
	}
};

export const getSubjectByIdService = async (subjectId: string) => {
	try {
		const subject = await Subject.findById(subjectId);
		if (!subject) throw new Error('Subject not found');
		return subject;
	} catch (error: any) {
		throw new Error(`Failed to fetch subject: ${error.message}`);
	}
};

export const updateSubjectStatusService = async (
	subjectId: string,
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{ status },
			{ new: true }
		);
		if (!updatedSubject) throw new Error('Subject not found');
		return updatedSubject;
	} catch (error: any) {
		throw new Error(`Failed to update subject status: ${error.message}`);
	}
};

export const updateSubjectService = async (
	subjectId: string,
	data: Partial<SubjectData>
) => {
	try {
		const updatedSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedSubject) throw new Error('Subject not found');
		return updatedSubject;
	} catch (error: any) {
		throw new Error(`Failed to update subject: ${error.message}`);
	}
};

export const deleteSubjectService = async (subjectId: string) => {
	try {
		const subject = await Subject.findByIdAndDelete(subjectId);
		if (!subject) throw new Error('Subject not found');
		return subject;
	} catch (error: any) {
		throw new Error(`Failed to delete subject: ${error.message}`);
	}
};

// --- Grade-Subjects ---
export const addGradeSubjectService = async (data: GradeSubjectData) => {
	try {
		const existingRelation = await GradeSubject.findOne({
			gradeId: data.gradeId,
			subjectId: data.subjectId,
		});
		if (existingRelation)
			throw new Error('This subject is already assigned to the grade');
		const gradeSubject = await GradeSubject.create(data);
		return gradeSubject;
	} catch (error: any) {
		throw new Error(`Failed to add grade-subject: ${error.message}`);
	}
};

export const getAllGradeSubjectsService = async () => {
	try {
		const gradeSubjects = await GradeSubject.find()
			.populate('gradeId')
			.populate('subjectId');
		return gradeSubjects;
	} catch (error: any) {
		throw new Error(`Failed to fetch grade-subjects: ${error.message}`);
	}
};

export const getGradeSubjectByIdService = async (gradeSubjectId: string) => {
	try {
		const gradeSubject = await GradeSubject.findById(gradeSubjectId)
			.populate('gradeId')
			.populate('subjectId');
		if (!gradeSubject) throw new Error('Grade-subject not found');
		return gradeSubject;
	} catch (error: any) {
		throw new Error(`Failed to fetch grade-subject: ${error.message}`);
	}
};

export const updateGradeSubjectStatusService = async (
	gradeSubjectId: string,
	status: 'Live' | 'Archive'
) => {
	try {
		const updatedGradeSubject = await GradeSubject.findByIdAndUpdate(
			gradeSubjectId,
			{ status },
			{ new: true }
		);
		if (!updatedGradeSubject) throw new Error('Grade-subject not found');
		return updatedGradeSubject;
	} catch (error: any) {
		throw new Error(`Failed to update grade-subject status: ${error.message}`);
	}
};

export const updateGradeSubjectService = async (
	gradeSubjectId: string,
	data: Partial<GradeSubjectData>
) => {
	try {
		const updatedGradeSubject = await GradeSubject.findByIdAndUpdate(
			gradeSubjectId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedGradeSubject) throw new Error('Grade-subject not found');
		return updatedGradeSubject;
	} catch (error: any) {
		throw new Error(`Failed to update grade-subject: ${error.message}`);
	}
};

export const deleteGradeSubjectService = async (gradeSubjectId: string) => {
	try {
		const gradeSubject = await GradeSubject.findByIdAndDelete(gradeSubjectId);
		if (!gradeSubject) throw new Error('Grade-subject not found');
		return gradeSubject;
	} catch (error: any) {
		throw new Error(`Failed to delete grade-subject: ${error.message}`);
	}
};

// --- Student-Subjects ---
export const addStudentSubjectService = async (data: StudentSubjectData) => {
	try {
		const existingRelation = await StudentSubject.findOne({
			studentId: data.studentId,
			subjectId: data.subjectId,
			teacherId: data.teacherId, // Added to match schema
		});
		if (existingRelation)
			throw new Error(
				'Student is already enrolled in this subject with this teacher'
			);
		const studentSubject = await StudentSubject.create(data);
		return studentSubject;
	} catch (error: any) {
		throw new Error(`Failed to add student-subject: ${error.message}`);
	}
};

export const getAllStudentSubjectsService = async () => {
	try {
		const studentSubjects = await StudentSubject.find()
			.populate('studentId')
			.populate('subjectId')
			.populate('teacherId'); // Added to match schema
		return studentSubjects;
	} catch (error: any) {
		throw new Error(`Failed to fetch student-subjects: ${error.message}`);
	}
};

export const updateStudentSubjectStatusService = async (
	studentSubjectId: string,
	status: 'Live' | 'Archive' // Updated to match schema
) => {
	try {
		const updatedStudentSubject = await StudentSubject.findByIdAndUpdate(
			studentSubjectId,
			{ status },
			{ new: true }
		);
		if (!updatedStudentSubject) throw new Error('Student-subject not found');
		return updatedStudentSubject;
	} catch (error: any) {
		throw new Error(
			`Failed to update student-subject status: ${error.message}`
		);
	}
};

// --- Attendance ---
export const recordAttendanceService = async (data: AttendanceData) => {
	try {
		const existingAttendance = await Attendance.findOne({
			student: data.student, // Updated to match schema
			date: data.date,
		});
		if (existingAttendance)
			throw new Error(
				'Attendance for this student on this date already exists'
			);
		const attendance = await Attendance.create(data);
		return attendance;
	} catch (error: any) {
		throw new Error(`Failed to record attendance: ${error.message}`);
	}
};

export const getAllAttendanceService = async () => {
	try {
		const attendanceRecords = await Attendance.find().populate('student'); // Updated to match schema
		return attendanceRecords;
	} catch (error: any) {
		throw new Error(`Failed to fetch attendance records: ${error.message}`);
	}
};

export const updateAttendanceStatusService = async (
	attendanceId: string,
	status: 'Present' | 'Absent' | 'Late'
) => {
	try {
		const updatedAttendance = await Attendance.findByIdAndUpdate(
			attendanceId,
			{ status },
			{ new: true }
		);
		if (!updatedAttendance) throw new Error('Attendance record not found');
		return updatedAttendance;
	} catch (error: any) {
		throw new Error(`Failed to update attendance status: ${error.message}`);
	}
};

// --- Assignments ---
export const addAssignmentService = async (data: AssignmentData) => {
	try {
		const assignment = await Assignment.create(data);
		return assignment;
	} catch (error: any) {
		throw new Error(`Failed to add assignment: ${error.message}`);
	}
};

export const getAllAssignmentsService = async () => {
	try {
		const assignments = await Assignment.find()
			.populate('gradeSubjectId')
			.populate('teacherId');
		return assignments;
	} catch (error: any) {
		throw new Error(`Failed to fetch assignments: ${error.message}`);
	}
};

export const getAssignmentByIdService = async (assignmentId: string) => {
	try {
		const assignment = await Assignment.findById(assignmentId)
			.populate('gradeSubjectId')
			.populate('teacherId');
		if (!assignment) throw new Error('Assignment not found');
		return assignment;
	} catch (error: any) {
		throw new Error(`Failed to fetch assignment: ${error.message}`);
	}
};

export const updateAssignmentService = async (
	assignmentId: string,
	data: Partial<AssignmentData>
) => {
	try {
		const updatedAssignment = await Assignment.findByIdAndUpdate(
			assignmentId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedAssignment) throw new Error('Assignment not found');
		return updatedAssignment;
	} catch (error: any) {
		throw new Error(`Failed to update assignment: ${error.message}`);
	}
};

export const deleteAssignmentService = async (assignmentId: string) => {
	try {
		const assignment = await Assignment.findByIdAndDelete(assignmentId);
		if (!assignment) throw new Error('Assignment not found');
		return assignment;
	} catch (error: any) {
		throw new Error(`Failed to delete assignment: ${error.message}`);
	}
};

// --- Quizzes ---
export const addQuizService = async (data: QuizData) => {
	try {
		const quiz = await Quiz.create(data);
		return quiz;
	} catch (error: any) {
		throw new Error(`Failed to add quiz: ${error.message}`);
	}
};

export const getAllQuizzesService = async () => {
	try {
		const quizzes = await Quiz.find()
			.populate('gradeSubjectId')
			.populate('teacherId');
		return quizzes;
	} catch (error: any) {
		throw new Error(`Failed to fetch quizzes: ${error.message}`);
	}
};

export const getQuizByIdService = async (quizId: string) => {
	try {
		const quiz = await Quiz.findById(quizId)
			.populate('gradeSubjectId')
			.populate('teacherId');
		if (!quiz) throw new Error('Quiz not found');
		return quiz;
	} catch (error: any) {
		throw new Error(`Failed to fetch quiz: ${error.message}`);
	}
};

export const updateQuizService = async (
	quizId: string,
	data: Partial<QuizData>
) => {
	try {
		const updatedQuiz = await Quiz.findByIdAndUpdate(
			quizId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedQuiz) throw new Error('Quiz not found');
		return updatedQuiz;
	} catch (error: any) {
		throw new Error(`Failed to update quiz: ${error.message}`);
	}
};

export const deleteQuizService = async (quizId: string) => {
	try {
		const quiz = await Quiz.findByIdAndDelete(quizId);
		if (!quiz) throw new Error('Quiz not found');
		return quiz;
	} catch (error: any) {
		throw new Error(`Failed to delete quiz: ${error.message}`);
	}
};

// --- Quiz-Students ---
export const addQuizStudentService = async (data: QuizStudentData) => {
	try {
		const existingQuizStudent = await QuizStudent.findOne({
			quizId: data.quizId,
			studentId: data.studentId,
		});
		if (existingQuizStudent)
			throw new Error('Student has already attempted this quiz');
		const quizStudent = await QuizStudent.create(data);
		return quizStudent;
	} catch (error: any) {
		throw new Error(`Failed to add quiz-student: ${error.message}`);
	}
};

export const getAllQuizStudentsService = async () => {
	try {
		const quizStudents = await QuizStudent.find()
			.populate('quizId')
			.populate('studentId');
		return quizStudents;
	} catch (error: any) {
		throw new Error(`Failed to fetch quiz-students: ${error.message}`);
	}
};

export const getQuizStudentByIdService = async (quizStudentId: string) => {
	try {
		const quizStudent = await QuizStudent.findById(quizStudentId)
			.populate('quizId')
			.populate('studentId');
		if (!quizStudent) throw new Error('Quiz-student not found');
		return quizStudent;
	} catch (error: any) {
		throw new Error(`Failed to fetch quiz-student: ${error.message}`);
	}
};

export const updateQuizStudentService = async (
	quizStudentId: string,
	data: Partial<QuizStudentData>
) => {
	try {
		const updatedQuizStudent = await QuizStudent.findByIdAndUpdate(
			quizStudentId,
			{ $set: data },
			{ new: true, runValidators: true }
		);
		if (!updatedQuizStudent) throw new Error('Quiz-student not found');
		return updatedQuizStudent;
	} catch (error: any) {
		throw new Error(`Failed to update quiz-student: ${error.message}`);
	}
};

// --- Notes ---
export const addNoteService = async (data: NoteData) => {
	try {
		const note = await Notes.create(data);
		return note;
	} catch (error: any) {
		throw new Error(`Failed to add note: ${error.message}`);
	}
};

export const getAllNotesService = async () => {
	try {
		const notes = await Notes.find()
			.populate('gradeSubject')
			.populate('teacher');
		return notes;
	} catch (error: any) {
		throw new Error(`Failed to fetch notes: ${error.message}`);
	}
};

export const getNoteByIdService = async (noteId: string) => {
	try {
		const note = await Notes.findById(noteId)
			.populate('gradeSubject')
			.populate('teacher');
		if (!note) throw new Error('Note not found');
		return note;
	} catch (error: any) {
		throw new Error(`Failed to fetch note: ${error.message}`);
	}
};
