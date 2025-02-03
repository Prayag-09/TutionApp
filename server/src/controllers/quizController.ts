import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import QuizService from '../services/quizService';

const QuizController = {
	// Create a new quiz.
	addQuiz: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const { name, gradeSubjectId, teacherId, timeLimit, maxMark, questions } =
				req.body;
			const quiz = await QuizService.createQuiz({
				name,
				gradeSubjectId,
				teacherId,
				timeLimit,
				maxMark,
				questions,
			});
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Quiz added successfully', quiz });
		} catch (error) {
			next(error);
		}
	},

	// Update an existing quiz.
	editQuiz: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
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
			const quiz = await QuizService.updateQuiz(quizId, {
				name,
				gradeSubjectId,
				teacherId,
				timeLimit,
				maxMark,
				questions,
			});
			if (!quiz) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Quiz not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Quiz updated successfully', quiz });
		} catch (error) {
			next(error);
		}
	},

	// Archive a quiz.
	archiveQuiz: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const { quizId } = req.body;
			const quiz = await QuizService.changeQuizStatus(quizId, 'Archived');
			if (!quiz) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Quiz not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Quiz archived successfully', quiz });
		} catch (error) {
			next(error);
		}
	},

	// Restore a quiz.
	restoreQuiz: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const { quizId } = req.body;
			const quiz = await QuizService.changeQuizStatus(quizId, 'Live');
			if (!quiz) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Quiz not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Quiz restored successfully', quiz });
		} catch (error) {
			next(error);
		}
	},
};

export default QuizController;
