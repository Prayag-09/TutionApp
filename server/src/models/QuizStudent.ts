import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizStudent extends Document {
	quizId: mongoose.Types.ObjectId;
	studentId: mongoose.Types.ObjectId;
	mark?: number;
	status: 'Attempted' | 'Not Attempted';
}

const quizStudentSchema = new Schema<IQuizStudent>(
	{
		quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
		studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
		mark: { type: Number },
		status: {
			type: String,
			enum: ['Attempted', 'Not Attempted'],
			default: 'Not Attempted',
		},
	},
	{ timestamps: true }
);

export const QuizStudent = mongoose.model<IQuizStudent>(
	'QuizStudent',
	quizStudentSchema
);
