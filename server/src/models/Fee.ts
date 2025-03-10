import mongoose, { Schema, Document } from 'mongoose';

export interface IFee extends Document {
	feeName: string;
	gradeId: mongoose.Types.ObjectId;
	subjectId: mongoose.Types.ObjectId;
	teacherId: mongoose.Types.ObjectId;
	amount: number;
}

const feeSchema = new Schema<IFee>(
	{
		feeName: { type: String, required: true },
		gradeId: { type: Schema.Types.ObjectId, ref: 'Grade', required: true },
		subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
		teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		amount: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const Fee = mongoose.model<IFee>('Fee', feeSchema);
