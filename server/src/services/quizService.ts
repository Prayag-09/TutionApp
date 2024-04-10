const Quiz = require('../models/schema').Quiz;

class QuizService {
	static async createQuiz(data: {
		name: string;
		gradeSubjectId: string;
		teacherId: string;
		timeLimit: number;
		maxMark: number;
		questions: any[];
	}): Promise<any> {
		try {
			const quiz = new Quiz({
				...data,
				status: 'Live',
			});
			return await quiz.save();
		} catch (error) {
			console.log(error);
			throw new Error('Failed to create quiz');
		}
	}

	static async updateQuiz(
		quizId: string,
		data: Partial<{
			name: string;
			gradeSubjectId: string;
			teacherId: string;
			timeLimit: number;
			maxMark: number;
			questions: any[];
		}>
	): Promise<any> {
		try {
			const quiz = await Quiz.findByIdAndUpdate(quizId, data, { new: true });
			return quiz;
		} catch (error) {
			console.log(error);
			throw new Error('Failed to update quiz');
		}
	}

	static async changeQuizStatus(
		quizId: string,
		status: 'Live' | 'Archived'
	): Promise<any> {
		try {
			const quiz = await Quiz.findByIdAndUpdate(
				quizId,
				{ status },
				{ new: true }
			);
			return quiz;
		} catch (error) {
			console.log(error);
			throw new Error(`Failed to change quiz status to ${status}`);
		}
	}
}

export default QuizService;
