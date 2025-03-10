import { Fee } from '../models/Fee';
import { FeeRemittance } from '../models/FeeRemittance';
import { Grade } from '../models/Grade';
import { Parent } from '../models/Parent';
import { Student } from '../models/Student';
import { Subject } from '../models/Subject';
import { Teacher } from '../models/Teacher';

// **Create a new fee**
export const createFeeService = async (feeData: any) => {
	// Check if fee already exists
	const existingFee = await Fee.findOne({
		feeName: feeData.feeName,
		gradeId: feeData.gradeId,
		subjectId: feeData.subjectId,
		teacherId: feeData.teacherId,
	});
	if (existingFee) {
		throw new Error('A fee with the same details already exists');
	}

	// Validate related entities before creating the fee
	const gradeExists = await Grade.exists({ _id: feeData.gradeId });
	const subjectExists = await Subject.exists({ _id: feeData.subjectId });
	const teacherExists = await Teacher.exists({ _id: feeData.teacherId });

	if (!gradeExists) throw new Error('Invalid grade ID');
	if (!subjectExists) throw new Error('Invalid subject ID');
	if (!teacherExists) throw new Error('Invalid teacher ID');

	const newFee = new Fee({ ...feeData });
	await newFee.save();
	return { success: true, fee: newFee };
};

// **Fetch all fees**
export const fetchAllFeesService = async () => {
	const fees = await Fee.find()
		.populate('gradeId', 'gradeName')
		.populate('subjectId', 'subjectName')
		.populate('teacherId', 'name email');

	return { success: true, fees };
};

// // **Update fee status**
// export const modifyFeeStatusService = async (feeId: any, status: string) => {
// 	const updatedFee = await Fee.findByIdAndUpdate(
// 		feeId,
// 		{ status },
// 		{ new: true }
// 	);
// 	if (!updatedFee) throw new Error('Fee not found');
// 	return { success: true, updatedFee };
// };

// **Create a new fee remittance (payment)**
export const createFeeRemittanceService = async (remittanceData: any) => {
	// Check if the remittance already exists
	const existingRemittance = await FeeRemittance.findOne({
		studentId: remittanceData.studentId,
		feeId: remittanceData.feeId,
	});
	if (existingRemittance) {
		throw new Error('This student has already paid for this fee');
	}

	// Validate related entities before creating the remittance
	const studentExists = await Student.exists({ _id: remittanceData.studentId });
	const parentExists = await Parent.exists({ _id: remittanceData.parentId });
	const feeExists = await Fee.exists({ _id: remittanceData.feeId });

	if (!studentExists) throw new Error('Invalid student ID');
	if (!parentExists) throw new Error('Invalid parent ID');
	if (!feeExists) throw new Error('Invalid fee ID');

	const newRemittance = new FeeRemittance(remittanceData);
	await newRemittance.save();
	return { success: true, remittance: newRemittance };
};

// **Fetch all fee remittances**
export const fetchAllFeeRemittancesService = async () => {
	const remittances = await FeeRemittance.find()
		.populate('studentId', 'name email')
		.populate('feeId', 'feeName amount')
		.populate('parentId', 'name email');
	return { success: true, remittances };
};

// **Fetch fee remittances by student ID**
export const fetchRemittancesByStudentService = async (studentId: string) => {
	const remittances = await FeeRemittance.find({ studentId })
		.populate('feeId', 'feeName amount')
		.populate('parentId', 'name email');
	return { success: true, remittances };
};

// **Fetch a single fee remittance by ID**
export const fetchRemittanceByIdService = async (remittanceId: string) => {
	const remittance = await FeeRemittance.findById(remittanceId)
		.populate('studentId', 'name email')
		.populate('feeId', 'feeName amount')
		.populate('parentId', 'name email');

	if (!remittance) throw new Error('Fee remittance not found');
	return { success: true, remittance };
};

// **Delete a fee remittance**
export const deleteFeeRemittanceService = async (remittanceId: string) => {
	const deletedRemittance = await FeeRemittance.findByIdAndDelete(remittanceId);
	if (!deletedRemittance) throw new Error('Fee remittance not found');
	return { success: true, message: 'Fee remittance deleted successfully' };
};
