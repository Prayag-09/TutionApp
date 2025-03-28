import { Fee } from '../models/Fee';
import { FeeRemittance } from '../models/FeeRemittance';
import { Parent } from '../models/Parent';
import { Student } from '../models/Student';
import {
	createFeeRemittanceService,
	createFeeService,
	fetchAllFeeRemittancesService,
	fetchAllFeesService,
	fetchRemittanceByIdService,
	fetchRemittancesByStudentService,
	modifyFeeStatusService,
	deleteFeeRemittanceService,
	updateFeeService,
	deleteFeeService,
	getFeesByStudentService,
	getFeeByIdService,
	updateFeeRemittanceService,
} from '../services/fee-services';

// **Add New Fee**
export const addFeeController = async (feeData: any) => {
	try {
		const newFee = await createFeeService(feeData);
		return { success: true, data: newFee };
	} catch (error: any) {
		throw new Error(error.message || 'Unable to add fee');
	}
};

// **Get All Fees**
export const getAllFeesController = async () => {
	try {
		const fees = await fetchAllFeesService();
		return { success: true, data: fees };
	} catch (error: any) {
		throw new Error(error.message || 'Error fetching fees');
	}
};

// **Update Fee Status**
export const updateFeeStatusController = async (
	feeId: string,
	status: string
) => {
	try {
		const updatedFee = await modifyFeeStatusService(feeId, status);
		return { success: true, data: updatedFee };
	} catch (error: any) {
		throw new Error(error.message || 'Error updating fee status');
	}
};

// **Update Fee Details**
export const updateFeeController = async (feeId: string, feeData: any) => {
	try {
		const updatedFee = await updateFeeService(feeId, feeData);
		return { success: true, data: updatedFee };
	} catch (error: any) {
		throw new Error(error.message || 'Error updating fee');
	}
};

// **Delete a Fee**
export const deleteFeeController = async (feeId: string) => {
	try {
		await deleteFeeService(feeId);
		return { success: true, message: 'Fee deleted successfully' };
	} catch (error: any) {
		throw new Error(error.message || 'Error deleting fee');
	}
};

// **Create a new fee remittance (payment)**
export const createFeeRemittanceController = async (remittanceData: any) => {
	try {
		const newRemittance = await createFeeRemittanceService(remittanceData);
		return { success: true, data: newRemittance };
	} catch (error: any) {
		throw new Error(error.message || 'Error processing fee remittance');
	}
};

// **Fetch all fee remittances**
export const fetchAllFeeRemittancesController = async () => {
	try {
		const remittances = await fetchAllFeeRemittancesService();
		return { success: true, data: remittances };
	} catch (error: any) {
		throw new Error(error.message || 'Error fetching fee remittances');
	}
};

// **Fetch fee remittances by student ID**
export const fetchRemittancesByStudentController = async (
	studentId: string
) => {
	try {
		const remittances = await fetchRemittancesByStudentService(studentId);
		return { success: true, data: remittances };
	} catch (error: any) {
		throw new Error(error.message || 'Error fetching remittances');
	}
};

// **Fetch a single fee remittance by ID**
export const fetchRemittanceByIdController = async (remittanceId: string) => {
	try {
		const remittance = await fetchRemittanceByIdService(remittanceId);
		return { success: true, data: remittance };
	} catch (error: any) {
		throw new Error(error.message || 'Fee remittance not found');
	}
};

// **Delete a fee remittance**
export const deleteFeeRemittanceController = async (remittanceId: string) => {
	try {
		const response = await deleteFeeRemittanceService(remittanceId);
		return {
			success: true,
			message: response.message || 'Fee remittance deleted successfully',
		};
	} catch (error: any) {
		throw new Error(error.message || 'Error deleting fee remittance');
	}
};

// **Get fees by student ID**
export const getFeesByStudentController = async (studentId: string) => {
	try {
		const response = await getFeesByStudentService(studentId);
		if (!response.success || !('fees' in response)) {
			throw new Error(
				('error' in response ? response.error : response.message) ||
					'Failed to fetch fees'
			);
		}
		return {
			success: true,
			fees: response.fees,
			message: response.message || 'Fees retrieved successfully',
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message || 'Error fetching fees for student',
		};
	}
};

// **Get a single fee by ID**
export const getFeeByIdController = async (feeId: string) => {
	try {
		const response = await getFeeByIdService(feeId);
		if ('fee' in response) {
			return { success: true, data: response.fee };
		} else {
			throw new Error(response.error || 'Error fetching fee');
		}
	} catch (error: any) {
		throw new Error(error.message || 'Error fetching fee');
	}
};

// **Update a fee remittance**
export const updateFeeRemittanceController = async (
	remittanceId: string,
	remittanceData: any
) => {
	try {
		const response = await updateFeeRemittanceService(
			remittanceId,
			remittanceData
		);
		if ('remittance' in response) {
			return { success: true, data: response.remittance };
		} else {
			throw new Error(response.error || 'Error updating fee remittance');
		}
	} catch (error: any) {
		throw new Error(error.message || 'Error updating fee remittance');
	}
};
