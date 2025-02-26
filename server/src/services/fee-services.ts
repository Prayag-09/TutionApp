import { Fee } from '../models/Fee';

// **Create a new fee**
export const createFee = async (feeData: any) => {
	const newFee = new Fee({ ...feeData, status: 'Live' });
	await newFee.save();
	return newFee;
};

// **Fetch all fees**
export const fetchAllFees = async () => {
	const fees = await Fee.find().populate('studentId', 'name email');
	return fees;
};

// **Update fee status**
export const modifyFeeStatus = async (feeId: any, status: string) => {
	const updatedFee = await Fee.findByIdAndUpdate(
		feeId,
		{ status },
		{ new: true }
	);
	if (!updatedFee) throw new Error('Fee not found');
	return updatedFee;
};
