import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
	name: string;
	gradeSubjectId: mongoose.Types.ObjectId;
	teacherId: mongoose.Types.ObjectId;
	maxMark: number;
}

const examSchema = new Schema<IExam>(
	{
		name: { type: String, required: true },
		gradeSubjectId: {
			type: Schema.Types.ObjectId,
			ref: 'GradeSubject',
			required: true,
		},
		teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		maxMark: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const Exam = mongoose.model<IExam>('Exam', examSchema);
