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
		await deleteFeeRemittanceService(remittanceId);
		return { success: true, message: 'Fee remittance deleted successfully' };
	} catch (error: any) {
		throw new Error(error.message || 'Error deleting fee remittance');
	}
};
