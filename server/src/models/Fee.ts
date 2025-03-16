import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod'; // Ensure you're using Zod for validation

export interface IFee extends Document {
	feeName: string;
	gradeId: mongoose.Types.ObjectId;
	subjectId: mongoose.Types.ObjectId;
	teacherId: mongoose.Types.ObjectId;
	amount: number;
	status: 'pending' | 'paid' | 'canceled';
}

const feeSchema = new Schema<IFee>(
	{
		feeName: { type: String, required: true },
		gradeId: { type: Schema.Types.ObjectId, ref: 'Grade', required: true },
		subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
		teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		amount: { type: Number, required: true },
		status: {
			type: String,
			enum: ['pending', 'paid', 'canceled'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

export const Fee = mongoose.model<IFee>('Fee', feeSchema);

