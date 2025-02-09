import mongoose, { Schema, Document } from 'mongoose';

export interface IFeeRemittance extends Document {
	studentId: mongoose.Types.ObjectId;
	feeId: mongoose.Types.ObjectId;
	parentId: mongoose.Types.ObjectId;
	amountPaid: number;
	paymentDate: Date;
	paymentMethod: 'Cash' | 'Online' | 'Bank Transfer';
	receiptNumber: string;
}

const feeRemittanceSchema = new Schema<IFeeRemittance>(
	{
		studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
		feeId: { type: Schema.Types.ObjectId, ref: 'Fee', required: true },
		parentId: { type: Schema.Types.ObjectId, ref: 'Parent', required: true },
		amountPaid: { type: Number, required: true },
		paymentDate: { type: Date, required: true, default: Date.now },
		paymentMethod: {
			type: String,
			enum: ['Cash', 'Online', 'Bank Transfer'],
			required: true,
		},
		receiptNumber: { type: String, unique: true, required: true },
	},
	{ timestamps: true }
);

export const FeeRemittance = mongoose.model<IFeeRemittance>(
	'FeeRemittance',
	feeRemittanceSchema
);
