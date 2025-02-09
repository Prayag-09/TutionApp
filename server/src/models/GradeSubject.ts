import mongoose, { Schema, Document } from 'mongoose';

export interface IGradeSubject extends Document {
	gradeId: mongoose.Types.ObjectId;
	subjectId: mongoose.Types.ObjectId;
	status: 'Live' | 'Archive';
}

const gradeSubjectSchema = new Schema<IGradeSubject>(
	{
		gradeId: { type: Schema.Types.ObjectId, ref: 'Grade', required: true },
		subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);

export const GradeSubject = mongoose.model<IGradeSubject>(
	'GradeSubject',
	gradeSubjectSchema
);
