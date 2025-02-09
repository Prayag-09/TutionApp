import mongoose, { Schema, Document } from 'mongoose';

interface Address {
	address: string;
	city: string;
	state: string;
	country: string;
	zipCode?: string;
}

export interface IStudent extends Document {
	name: string;
	mobile?: string;
	email?: string;
	residentialAddress: Address;
	parentId: mongoose.Types.ObjectId;
	gradeId: mongoose.Types.ObjectId;
	subjects: {
		subjectId: mongoose.Types.ObjectId;
		teacherId: mongoose.Types.ObjectId;
		status: 'Live' | 'Archive';
	}[];
	status: 'Live' | 'Archive';
}

const studentSchema = new Schema<IStudent>(
	{
		name: { type: String, required: true },
		mobile: { type: String },
		email: { type: String },
		residentialAddress: {
			address: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
		},
		parentId: { type: Schema.Types.ObjectId, ref: 'Parent' },
		gradeId: { type: Schema.Types.ObjectId, ref: 'Grade' },
		subjects: [
			{
				subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
				teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
				status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
			},
		],
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);

export const Student = mongoose.model<IStudent>('Student', studentSchema);
