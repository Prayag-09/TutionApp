import { Request, Response } from 'express';
import { StudentSubject } from '../models/StudentSubject';
import { Grade } from '../models/Grade';
import { GradeSubject } from '../models/GradeSubject';
import { Subject } from '../models/Subject';
import { Attendance } from '../models/Attendance';

// Grade

// Add new grade (POST)
export const addGrade = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const newGrade = new Grade({ name, description, status: 'Live' });
		await newGrade.save();

		res.status(201).json({ message: 'Grade added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding grade' });
	}
};

// Get all grades (GET)
export const getAllGrades = async (_req: Request, res: Response) => {
	try {
		const grades = await Grade.find();
		res.json(grades);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching grades' });
	}
};

// Edit grade status (Live / Archived) (EDIT)
export const updateGradeStatus = async (req: Request, res: Response) => {
	try {
		const { gradeId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const grade = await Grade.findByIdAndUpdate(
			gradeId,
			{ status },
			{ new: true }
		);
		if (!grade) return res.status(404).json({ error: 'Grade not found' });

		res.json({ message: `Grade status updated to ${status}`, grade });
	} catch (error) {
		res.status(500).json({ error: 'Error updating grade status' });
	}
};

// Grade Subjects

// Add new grade-subject relation (POST)
export const addGradeSubject = async (req: Request, res: Response) => {
	try {
		const { gradeId, subjectId, teacherId } = req.body;
		const newGradeSubject = new GradeSubject({
			gradeId,
			subjectId,
			teacherId,
			status: 'Live',
		});
		await newGradeSubject.save();

		res
			.status(201)
			.json({ message: 'Grade-Subject relation added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding grade-subject relation' });
	}
};

// Get all grade-subject relations (GET)
export const getAllGradeSubjects = async (_req: Request, res: Response) => {
	try {
		const gradeSubjects = await GradeSubject.find();
		res.json(gradeSubjects);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching grade-subject relations' });
	}
};

// Edit grade-subject relation status (Live / Archived) (EDIT)
export const updateGradeSubjectStatus = async (req: Request, res: Response) => {
	try {
		const { gradeSubjectId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const gradeSubject = await GradeSubject.findByIdAndUpdate(
			gradeSubjectId,
			{ status },
			{ new: true }
		);
		if (!gradeSubject)
			return res
				.status(404)
				.json({ error: 'Grade-Subject relation not found' });

		res.json({
			message: `Grade-Subject status updated to ${status}`,
			gradeSubject,
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Error updating grade-subject relation status' });
	}
};

// Subjects

// Add new subject (POST)
export const addSubject = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const newSubject = new Subject({ name, description, status: 'Live' });
		await newSubject.save();

		res.status(201).json({ message: 'Subject added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding subject' });
	}
};

// Get all subjects (GET)
export const getAllSubjects = async (_req: Request, res: Response) => {
	try {
		const subjects = await Subject.find();
		res.json(subjects);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching subjects' });
	}
};

// Edit subject status (Live / Archived) (EDIT)
export const updateSubjectStatus = async (req: Request, res: Response) => {
	try {
		const { subjectId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const subject = await Subject.findByIdAndUpdate(
			subjectId,
			{ status },
			{ new: true }
		);
		if (!subject) return res.status(404).json({ error: 'Subject not found' });

		res.json({ message: `Subject status updated to ${status}`, subject });
	} catch (error) {
		res.status(500).json({ error: 'Error updating subject status' });
	}
};

// Student Subjects

// Add new student-subject relation (POST)
export const addStudentSubject = async (req: Request, res: Response) => {
	try {
		const { studentId, subjectId } = req.body;
		const newStudentSubject = new StudentSubject({
			studentId,
			subjectId,
			status: 'Live',
		});
		await newStudentSubject.save();

		res
			.status(201)
			.json({ message: 'Student-Subject relation added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding student-subject relation' });
	}
};

// Get all student-subject relations (GET)
export const getAllStudentSubjects = async (_req: Request, res: Response) => {
	try {
		const studentSubjects = await StudentSubject.find();
		res.json(studentSubjects);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching student-subject relations' });
	}
};

// Edit student-subject relation status (Live / Archived) (EDIT)
export const updateStudentSubjectStatus = async (
	req: Request,
	res: Response
) => {
	try {
		const { studentSubjectId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const studentSubject = await StudentSubject.findByIdAndUpdate(
			studentSubjectId,
			{ status },
			{ new: true }
		);
		if (!studentSubject)
			return res
				.status(404)
				.json({ error: 'Student-Subject relation not found' });

		res.json({
			message: `Student-Subject status updated to ${status}`,
			studentSubject,
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Error updating student-subject relation status' });
	}
};

// Students Attendance

// Record attendance (POST)
export const recordAttendance = async (req: Request, res: Response) => {
	try {
		const { studentId, date, status } = req.body;
		const newAttendance = new Attendance({ studentId, date, status: 'Live' });
		await newAttendance.save();

		res.status(201).json({ message: 'Attendance recorded successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error recording attendance' });
	}
};

// Get all attendance records (GET)
export const getAllAttendance = async (_req: Request, res: Response) => {
	try {
		const attendanceRecords = await Attendance.find();
		res.json(attendanceRecords);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching attendance records' });
	}
};

// Edit attendance status (Live / Archived) (EDIT)
export const updateAttendanceStatus = async (req: Request, res: Response) => {
	try {
		const { attendanceId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const attendance = await Attendance.findByIdAndUpdate(
			attendanceId,
			{ status },
			{ new: true }
		);
		if (!attendance)
			return res.status(404).json({ error: 'Attendance record not found' });

		res.json({ message: `Attendance status updated to ${status}`, attendance });
	} catch (error) {
		res.status(500).json({ error: 'Error updating attendance status' });
	}
};
