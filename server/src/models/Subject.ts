import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
	name: string;
	description?: string;
	status: 'Live' | 'Archive';
}

const subjectSchema = new Schema<ISubject>(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);

export const Subject = mongoose.model<ISubject>('Subject', subjectSchema);
