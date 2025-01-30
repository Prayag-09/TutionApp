const Quiz = require('../database/schema').Quiz;
import { Request, Response } from 'express';

const QuizController = {
	async addQuiz(req: Request, res: Response) {
		try {
			const { name, gradeSubjectId, teacherId, timeLimit, maxMark, questions } =
				req.body;
			const quiz = new Quiz({
				name,
				gradeSubjectId,
				teacherId,
				timeLimit,
				maxMark,
				questions,
			});
			await quiz.save();
			res.status(201).json({ message: 'Quiz added successfully', quiz });
		} catch (error) {
			res.status(500).json({ message: 'Failed to add quiz', error });
		}
	},

	async editQuiz(req: Request, res: Response) {
		try {
			const {
				quizId,
				name,
				gradeSubjectId,
				teacherId,
				timeLimit,
				maxMark,
				questions,
			} = req.body;
			const quiz = await Quiz.findByIdAndUpdate(
				quizId,
				{ name, gradeSubjectId, teacherId, timeLimit, maxMark, questions },
				{ new: true }
			);
			if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
			res.status(200).json({ message: 'Quiz updated successfully', quiz });
		} catch (error) {
			res.status(500).json({ message: 'Failed to update quiz', error });
		}
	},

	async archiveQuiz(req: Request, res: Response) {
		try {
			const { quizId } = req.body;
			const quiz = await Quiz.findByIdAndUpdate(
				quizId,
				{ status: 'Archived' },
				{ new: true }
			);
			if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
			res.status(200).json({ message: 'Quiz archived successfully', quiz });
		} catch (error) {
			res.status(500).json({ message: 'Failed to archive quiz', error });
		}
	},

	async restoreQuiz(req: Request, res: Response) {
		try {
			const { quizId } = req.body;
			const quiz = await Quiz.findByIdAndUpdate(
				quizId,
				{ status: 'Live' },
				{ new: true }
			);
			if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
			res.status(200).json({ message: 'Quiz restored successfully', quiz });
		} catch (error) {
			res.status(500).json({ message: 'Failed to restore quiz', error });
		}
	},
};

module.exports = QuizController;
