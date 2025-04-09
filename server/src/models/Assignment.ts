import e from 'express';
import mongoose, { Schema } from 'mongoose';

export interface IAssignment extends Document {
	name: string;
	gradeSubjectId: mongoose.Types.ObjectId;
	teacherId: mongoose.Types.ObjectId;
	details: string;
	file?: string;
	maximumMark: number;
	status: 'Live' | 'Archive';
	dueDate?: Date;
	detailsFile?: String,
}

const assignmentSchema = new Schema<IAssignment>(
	{
		name: { type: String, required: true, trim: true },
		gradeSubjectId: {
			type: Schema.Types.ObjectId,
			ref: 'GradeSubject',
			required: true,
		},
		teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		details: { type: String, required: true, trim: true },
		file: { type: String, trim: true },
		maximumMark: { type: Number, required: true },
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
		dueDate: { type: Date },
		detailsFile: { type: String },
	},
	{ timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>(
	'Assignment',
	assignmentSchema
);
