import { Types } from 'mongoose';
import { Grade } from '../models/Grade';
import { GradeSubject } from '../models/GradeSubject';
import { Subject } from '../models/Subject';
import { StudentSubject } from '../models/StudentSubject';
import { Attendance } from '../models/Attendance';

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

export const updateGradeStatusService = async (
	gradeId: Types.ObjectId,
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

export const updateGradeSubjectStatusService = async (
	gradeSubjectId: Types.ObjectId,
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

export const updateSubjectStatusService = async (
	subjectId: Types.ObjectId,
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
	studentSubjectId: Types.ObjectId,
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
	attendanceId: Types.ObjectId,
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
