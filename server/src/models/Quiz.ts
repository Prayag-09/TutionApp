import mongoose, { Schema, Document } from 'mongoose';

interface Question {
	question: string;
	options: string[];
	correctOption: string;
}

export interface IQuiz extends Document {
	name: string;
	gradeSubjectId: mongoose.Types.ObjectId;
	teacherId: mongoose.Types.ObjectId;
	timeLimit?: number;
	maxMark?: number;
	questions: Question[];
	status: 'Live' | 'Archive';
}

const quizSchema = new Schema<IQuiz>(
	{
		name: { type: String, required: true },
		gradeSubjectId: {
			type: Schema.Types.ObjectId,
			ref: 'GradeSubject',
			required: true,
		},
		teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		timeLimit: { type: Number },
		maxMark: { type: Number },
		questions: [
			{
				question: { type: String, required: true },
				options: [{ type: String }],
				correctOption: { type: String, required: true },
			},
		],
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
