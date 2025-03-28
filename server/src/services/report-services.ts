import { User } from '../models/User';
import { Teacher } from '../models/Teacher';
import { Student } from '../models/Student';
import { Parent } from '../models/Parent';
import { Grade } from '../models/Grade';
import { Subject } from '../models/Subject';
import { GradeSubject } from '../models/GradeSubject';
import { StudentSubject } from '../models/StudentSubject';
import { Attendance } from '../models/Attendance';
import { Fee } from '../models/Fee';
import { FeeRemittance } from '../models/FeeRemittance';

// Utility function for handling errors
const handleServiceError = (error: any, message: string) => {
	console.error(error);
	return {
		success: false,
		error: error.message || message,
		details: error.details || [],
	};
};

// Generate user report
export const generateUserReportService = async () => {
	try {
		const [teachers, students, parents, users] = await Promise.all([
			Teacher.find().select('name email status'),
			Student.find().select('name email status'),
			Parent.find().select('name email status'),
			User.find().select('email role'),
		]);

		const report = {
			totalTeachers: teachers.length,
			activeTeachers: teachers.filter((t) => t.status === 'Live').length,
			totalStudents: students.length,
			activeStudents: students.filter((s) => s.status === 'Live').length,
			totalParents: parents.length,
			activeParents: parents.filter((p) => p.status === 'Live').length,
			roles: users.reduce((acc: any, user: any) => {
				acc[user.role] = (acc[user.role] || 0) + 1;
				return acc;
			}, {}),
		};

		return { success: true, data: report };
	} catch (error) {
		return handleServiceError(error, 'Failed to generate user report');
	}
};

// Generate tuition report
export const generateTuitionReportService = async () => {
	try {
		const [grades, subjects, gradeSubjects, studentSubjects] =
			await Promise.all([
				Grade.find().select('name status'),
				Subject.find().select('name status'),
				GradeSubject.find().populate('gradeId subjectId'),
				StudentSubject.find().populate('studentId subjectId'),
			]);

		const report = {
			totalGrades: grades.length,
			activeGrades: grades.filter((g) => g.status === 'Live').length,
			totalSubjects: subjects.length,
			activeSubjects: subjects.filter((s) => s.status === 'Live').length,
			totalGradeSubjects: gradeSubjects.length,
			activeGradeSubjects: gradeSubjects.filter((gs) => gs.status === 'Live')
				.length,
			totalStudentSubjects: studentSubjects.length,
			activeStudentSubjects: studentSubjects.filter(
				(ss) => ss.status === 'Live'
			).length,
			gradeSubjectBreakdown: gradeSubjects.reduce((acc: any, gs: any) => {
				const key = `${gs.gradeId.name}-${gs.subjectId.name}`;
				acc[key] = (acc[key] || 0) + 1;
				return acc;
			}, {}),
		};

		return { success: true, data: report };
	} catch (error) {
		return handleServiceError(error, 'Failed to generate tuition report');
	}
};

// Generate fee report
export const generateFeeReportService = async () => {
	try {
		const [fees, remittances] = await Promise.all([
			Fee.find().populate('gradeId subjectId teacherId'),
			FeeRemittance.find().populate('studentId feeId parentId'),
		]);

		const report = {
			totalFees: fees.length,
			pendingFees: fees.filter((f) => f.status === 'pending').length,
			paidFees: fees.filter((f) => f.status === 'paid').length,
			canceledFees: fees.filter((f) => f.status === 'canceled').length,
			totalRemittances: remittances.length,
			totalRevenue: remittances.reduce(
				(acc: number, r: any) => acc + (r.feeId?.amount || 0),
				0
			),
			feeBreakdown: fees.reduce((acc: any, f: any) => {
				const key = `${f.gradeId?.gradeName || 'Unknown'}-${
					f.subjectId?.subjectName || 'Unknown'
				}`;
				acc[key] = (acc[key] || 0) + f.amount;
				return acc;
			}, {}),
		};

		return { success: true, data: report };
	} catch (error) {
		return handleServiceError(error, 'Failed to generate fee report');
	}
};

// Generate attendance report
export const generateAttendanceReportService = async () => {
	try {
		const attendanceRecords = await Attendance.find().populate('studentId');

		const report = {
			totalRecords: attendanceRecords.length,
			presentRecords: attendanceRecords.filter((a) => a.status === 'Present')
				.length,
			absentRecords: attendanceRecords.filter((a) => a.status === 'Absent')
				.length,
			studentAttendance: attendanceRecords.reduce((acc: any, a: any) => {
				const studentName = a.studentId?.name || 'Unknown';
				if (!acc[studentName]) {
					acc[studentName] = { present: 0, absent: 0 };
				}
				if (a.status === 'Present') {
					acc[studentName].present += 1;
				} else if (a.status === 'Absent') {
					acc[studentName].absent += 1;
				}
				return acc;
			}, {}),
		};

		return { success: true, data: report };
	} catch (error) {
		return handleServiceError(error, 'Failed to generate attendance report');
	}
};
