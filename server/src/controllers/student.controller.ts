import { Request, Response } from 'express';
import { Student } from '../models/Student';

// Register a new student (POST)
export const registerStudent = async (req: Request, res: Response) => {
	try {
		const { name, age, grade, parentId } = req.body;
		const newStudent = new Student({
			name,
			age,
			grade,
			parentId,
			status: 'Live',
		});
		await newStudent.save();

		res.status(201).json({ message: 'Student registered successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error registering student' });
	}
};

// Get all students (GET)
export const getAllStudents = async (_req: Request, res: Response) => {
	try {
		const students = await Student.find();
		res.json(students);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching students' });
	}
};

// Edit student status (Live / Archived) (EDIT)
export const updateStudentStatus = async (req: Request, res: Response) => {
	try {
		const { studentId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const student = await Student.findByIdAndUpdate(
			studentId,
			{ status },
			{ new: true }
		);
		if (!student) return res.status(404).json({ error: 'Student not found' });

		res.json({ message: `Student status updated to ${status}`, student });
	} catch (error) {
		res.status(500).json({ error: 'Error updating student status' });
	}
};
