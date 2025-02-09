import mongoose, { Schema, Document } from 'mongoose';

interface Address {
	address: string;
	city: string;
	state: string;
	country: string;
	zipCode?: string;
}

export interface ITeacher extends Document {
	name: string;
	mobile: string;
	email: string;
	residentialAddress: Address;
	qualification?: string;
	status: 'Live' | 'Archive';
	gradeSubjects: { gradeSubjectId: mongoose.Types.ObjectId }[];
}

const teacherSchema = new Schema<ITeacher>(
	{
		name: { type: String, required: true },
		mobile: { type: String, required: true },
		email: { type: String, required: true },
		residentialAddress: {
			address: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zipCode: { type: String },
		},
		qualification: { type: String },
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
		gradeSubjects: [
			{ gradeSubjectId: { type: Schema.Types.ObjectId, ref: 'GradeSubject' } },
		],
	},
	{ timestamps: true }
);

export const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);
