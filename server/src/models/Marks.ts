import mongoose, { Schema, Document } from 'mongoose';

export interface IMarks extends Document {
	examId: mongoose.Types.ObjectId;
	studentId: mongoose.Types.ObjectId;
	mark: number;
}

const marksSchema = new Schema<IMarks>(
	{
		examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
		studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
		mark: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const Marks = mongoose.model<IMarks>('Marks', marksSchema);
