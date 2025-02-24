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
		name: { type: String, required: true, trim: true },
		mobile: {
			type: String,
			required: true,
			unique: true, // Enforces uniqueness
			match: /^[0-9]{10}$/, // Ensures a 10-digit mobile number
		},
		email: {
			type: String,
			required: true,
			unique: true, // Enforces uniqueness
			lowercase: true,
			trim: true,
			match: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Ensures proper email format
		},
		residentialAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
			zipCode: { type: String },
		},
		qualification: { type: String, trim: true },
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
		gradeSubjects: [
			{
				gradeSubjectId: {
					type: Schema.Types.ObjectId,
					ref: 'GradeSubject',
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);
export const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);
