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
		name: { type: String, required: true, trim: true },
		mobile: { type: String, trim: true, index: true }, // Indexed for faster lookup
		email: { type: String, trim: true, unique: true, sparse: true }, // Ensures uniqueness
		residentialAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
			zipCode: { type: String },
		},
		parentId: { type: Schema.Types.ObjectId, ref: 'Parent', required: true },
		gradeId: { type: Schema.Types.ObjectId, ref: 'Grade', required: true },
		subjects: {
			type: [
				{
					subjectId: {
						type: Schema.Types.ObjectId,
						ref: 'Subject',
						required: true,
					},
					teacherId: {
						type: Schema.Types.ObjectId,
						ref: 'Teacher',
						required: true,
					},
					status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
				},
			],
			validate: [
				(arr: any[]) => arr.length > 0,
				'Student must be assigned at least one subject',
			],
		},
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);

export const Student = mongoose.model<IStudent>('Student', studentSchema);
