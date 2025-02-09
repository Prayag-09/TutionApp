import mongoose, { Schema, Document } from 'mongoose';

export interface IGrade extends Document {
	name: string;
	description?: string;
	status: 'Live' | 'Archive';
	subjects: {
		subjectId: mongoose.Types.ObjectId;
		status: 'Live' | 'Archive';
	}[];
}

const gradeSchema = new Schema<IGrade>(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
		subjects: [
			{
				subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
				status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
			},
		],
	},
	{ timestamps: true }
);

export const Grade = mongoose.model<IGrade>('Grade', gradeSchema);
