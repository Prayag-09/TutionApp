import { Request, Response } from 'express';
import { QuizStudent } from '../models/QuizStudent';

// Add new quiz student record (POST)
export const addQuizStudent = async (req: Request, res: Response) => {
	try {
		const { quizId, studentId, answers, status } = req.body;
		const newQuizStudent = new QuizStudent({
			quizId,
			studentId,
			answers,
			status: 'Live',
		});
		await newQuizStudent.save();

		res.status(201).json({ message: 'Quiz record added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding quiz record' });
	}
};

// Get all quiz records (GET)
export const getAllQuizStudents = async (_req: Request, res: Response) => {
	try {
		const quizStudents = await QuizStudent.find();
		res.json(quizStudents);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching quiz records' });
	}
};

// Edit quiz record status (Live / Archived) (EDIT)
export const updateQuizStudentStatus = async (req: Request, res: Response) => {
	try {
		const { quizStudentId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const quizStudent = await QuizStudent.findByIdAndUpdate(
			quizStudentId,
			{ status },
			{ new: true }
		);
		if (!quizStudent)
			return res.status(404).json({ error: 'Quiz student record not found' });

		res.json({
			message: `Quiz student status updated to ${status}`,
			quizStudent,
		});
	} catch (error) {
		res.status(500).json({ error: 'Error updating quiz student status' });
	}
};
