import { Request, Response } from 'express';
import { Quiz } from '../models/Quiz';

// Add new quiz (POST)
export const addQuiz = async (req: Request, res: Response) => {
	try {
		const { title, subjectId, gradeId, quizDate, teacherId } = req.body;
		const newQuiz = new Quiz({
			title,
			subjectId,
			gradeId,
			quizDate,
			teacherId,
			status: 'Live',
		});
		await newQuiz.save();

		res.status(201).json({ message: 'Quiz added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding quiz' });
	}
};

// Get all quizzes (GET)
export const getAllQuizzes = async (_req: Request, res: Response) => {
	try {
		const quizzes = await Quiz.find();
		res.json(quizzes);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching quizzes' });
	}
};

// Edit quiz status (Live / Archived) (EDIT)
export const updateQuizStatus = async (req: Request, res: Response) => {
	try {
		const { quizId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const quiz = await Quiz.findByIdAndUpdate(
			quizId,
			{ status },
			{ new: true }
		);
		if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

		res.json({ message: `Quiz status updated to ${status}`, quiz });
	} catch (error) {
		res.status(500).json({ error: 'Error updating quiz status' });
	}
};
