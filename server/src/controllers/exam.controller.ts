import { Request, Response } from 'express';
import { Exam } from '../models/Exam';

// Add new exam (POST)
export const addExam = async (req: Request, res: Response) => {
	try {
		const { title, subjectId, gradeId, examDate, teacherId } = req.body;
		const newExam = new Exam({
			title,
			subjectId,
			gradeId,
			examDate,
			teacherId,
			status: 'Live',
		});
		await newExam.save();

		res.status(201).json({ message: 'Exam added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding exam' });
	}
};

// Get all exams (GET)
export const getAllExams = async (_req: Request, res: Response) => {
	try {
		const exams = await Exam.find();
		res.json(exams);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching exams' });
	}
};

// Edit exam status (Live / Archived) (EDIT)
export const updateExamStatus = async (req: Request, res: Response) => {
	try {
		const { examId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const exam = await Exam.findByIdAndUpdate(
			examId,
			{ status },
			{ new: true }
		);
		if (!exam) return res.status(404).json({ error: 'Exam not found' });

		res.json({ message: `Exam status updated to ${status}`, exam });
	} catch (error) {
		res.status(500).json({ error: 'Error updating exam status' });
	}
};
