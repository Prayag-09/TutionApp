import mongoose, { Schema, Document } from 'mongoose';

export interface IFee extends Document {
	gradeId: mongoose.Types.ObjectId;
	subjectId: mongoose.Types.ObjectId;
	teacherId: mongoose.Types.ObjectId;
	amount: number;
	validFrom: Date;
}

const feeSchema = new Schema<IFee>(
	{
		gradeId: { type: Schema.Types.ObjectId, ref: 'Grade', required: true },
		subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
		teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		amount: { type: Number, required: true },
		validFrom: { type: Date, required: true },
	},
	{ timestamps: true }
);

export const Fee = mongoose.model<IFee>('Fee', feeSchema);
