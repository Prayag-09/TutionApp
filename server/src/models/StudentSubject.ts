import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentSubject extends Document {
	studentId: mongoose.Types.ObjectId;
	subjectId: mongoose.Types.ObjectId;
	teacherId: mongoose.Types.ObjectId;
	status: 'Live' | 'Archive';
}

const studentSubjectSchema = new Schema<IStudentSubject>(
	{
		studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
		subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
		teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);

export const StudentSubject = mongoose.model<IStudentSubject>(
	'StudentSubject',
	studentSubjectSchema
);
