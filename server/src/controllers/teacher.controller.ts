import { Request, Response } from 'express';
import { Teacher } from '../models/Teacher';

// Register a new teacher (POST)
export const registerTeacher = async (req: Request, res: Response) => {
	try {
		const { name, subject, grade, status } = req.body;
		const newTeacher = new Teacher({ name, subject, grade, status: 'Live' });
		await newTeacher.save();

		res.status(201).json({ message: 'Teacher registered successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error registering teacher' });
	}
};

// Get all teachers (GET)
export const getAllTeachers = async (_req: Request, res: Response) => {
	try {
		const teachers = await Teacher.find();
		res.json(teachers);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching teachers' });
	}
};

// Edit teacher status (Live / Archived) (EDIT)
export const updateTeacherStatus = async (req: Request, res: Response) => {
	try {
		const { teacherId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const teacher = await Teacher.findByIdAndUpdate(
			teacherId,
			{ status },
			{ new: true }
		);
		if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

		res.json({ message: `Teacher status updated to ${status}`, teacher });
	} catch (error) {
		res.status(500).json({ error: 'Error updating teacher status' });
	}
};
