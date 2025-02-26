import { Request, Response } from 'express';
import {
	createFee,
	fetchAllFees,
	modifyFeeStatus,
} from '../services/fee-services';

// **Add New Fee**
export const addFee = async (feeData: any) => {
	try {
		const newFee = await createFee(feeData);
		return newFee;
	} catch (error: any) {
		throw new Error(error.message || 'Unable to add fee');
	}
};

// **Get All Fees**
export const getAllFees = async () => {
	try {
		const fees = await fetchAllFees();
		return fees;
	} catch (error: any) {
		throw new Error(error.message || 'Error fetching fees');
	}
};

// **Update Fee Status**
export const updateFeeStatus = async (feeId: any, status: string) => {
	try {
		const updatedFee = await modifyFeeStatus(feeId, status);
		return updatedFee;
	} catch (error: any) {
		throw new Error(error.message || 'Error updating fee status');
	}
};
