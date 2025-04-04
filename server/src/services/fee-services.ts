import { Types } from 'mongoose';
import { Fee } from '../models/Fee';
import { FeeRemittance } from '../models/FeeRemittance';
import { Grade } from '../models/Grade';
import { Parent } from '../models/Parent';
import { Student } from '../models/Student';
import { Subject } from '../models/Subject';
import { Teacher } from '../models/Teacher';
import { StudentSubject } from '../models/StudentSubject';

// **Create a new fee**
export const createFeeService = async (feeData: any) => {
	const existingFee = await Fee.findOne({
		feeName: feeData.feeName,
		gradeId: feeData.gradeId,
		subjectId: feeData.subjectId,
		teacherId: feeData.teacherId,
	});
	if (existingFee) {
		throw new Error('A fee with the same details already exists');
	}

	const [gradeExists, subjectExists, teacherExists] = await Promise.all([
		Grade.exists({ _id: feeData.gradeId }),
		Subject.exists({ _id: feeData.subjectId }),
		Teacher.exists({ _id: feeData.teacherId }),
	]);

	if (!gradeExists) throw new Error('Invalid grade ID');
	if (!subjectExists) throw new Error('Invalid subject ID');
	if (!teacherExists) throw new Error('Invalid teacher ID');

	const newFee = new Fee({ ...feeData, status: feeData.status || 'pending' });
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

// **Update fee status**
export const modifyFeeStatusService = async (feeId: string, status: string) => {
	const validStatuses = ['pending', 'paid', 'canceled'];
	if (!validStatuses.includes(status)) {
		throw new Error(
			`Invalid status. Allowed values: ${validStatuses.join(', ')}`
		);
	}

	const updatedFee = await Fee.findByIdAndUpdate(
		feeId,
		{ status },
		{ new: true }
	);
	if (!updatedFee) throw new Error('Fee not found');
	return { success: true, updatedFee };
};

// **Update an existing fee**
export const updateFeeService = async (feeId: string, feeData: any) => {
	const fee = await Fee.findById(feeId);
	if (!fee) throw new Error('Fee not found');

	const existingFee = await Fee.findOne({
		feeName: feeData.feeName,
		gradeId: feeData.gradeId,
		subjectId: feeData.subjectId,
		teacherId: feeData.teacherId,
		_id: { $ne: feeId },
	});
	if (existingFee)
		throw new Error('A fee with the same details already exists');

	const [gradeExists, subjectExists, teacherExists] = await Promise.all([
		Grade.exists({ _id: feeData.gradeId }),
		Subject.exists({ _id: feeData.subjectId }),
		Teacher.exists({ _id: feeData.teacherId }),
	]);

	if (!gradeExists) throw new Error('Invalid grade ID');
	if (!subjectExists) throw new Error('Invalid subject ID');
	if (!teacherExists) throw new Error('Invalid teacher ID');

	Object.assign(fee, feeData);
	await fee.save();
	return { success: true, updatedFee: fee };
};

// **Delete a fee**
export const deleteFeeService = async (feeId: string) => {
	const fee = await Fee.findByIdAndDelete(feeId);
	if (!fee) throw new Error('Fee not found');

	// Optionally, delete associated remittances
	await FeeRemittance.deleteMany({ feeId });
	return { success: true, message: 'Fee deleted successfully' };
};

// **Create a new fee remittance (payment)**
export const createFeeRemittanceService = async (remittanceData: any) => {
	const existingRemittanceCount = await FeeRemittance.countDocuments({
		studentId: remittanceData.studentId,
		feeId: remittanceData.feeId,
	});
	if (existingRemittanceCount > 0) {
		throw new Error('This student has already paid for this fee');
	}

	const [studentExists, parentExists, feeExists] = await Promise.all([
		Student.exists({ _id: remittanceData.studentId }),
		Parent.exists({ _id: remittanceData.parentId }),
		Fee.exists({ _id: remittanceData.feeId }),
	]);

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
		.sort({ createdAt: -1 }) // Sort by latest payments
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

// **Get fees by student ID**
export const getFeesByStudentService = async (studentId: string) => {
	try {
		if (!Types.ObjectId.isValid(studentId)) {
			throw new Error('Invalid student ID');
		}

		const studentExists = await Student.exists({ _id: studentId });
		if (!studentExists) {
			throw new Error('Student not found');
		}

		const studentSubjects = await StudentSubject.find({
			studentId: new Types.ObjectId(studentId),
		})
			.populate('subjectId', 'name')
			.populate('gradeId', 'gradeName')
			.lean();

		if (!studentSubjects || studentSubjects.length === 0) {
			return {
				success: true,
				fees: [],
				message: 'No subjects enrolled for this student',
			};
		}

		const subjectIds = studentSubjects.map((ss) => ss.subjectId);
		const gradeIds = studentSubjects.map((ss) => (ss as any).gradeId._id);

		const fees = await Fee.find({
			subjectId: { $in: subjectIds },
			gradeId: { $in: gradeIds },
		})
			.populate('gradeId', 'gradeName')
			.populate('subjectId', 'subjectName')
			.populate('teacherId', 'name email')
			.lean();

		if (!fees || fees.length === 0) {
			return {
				success: true,
				fees: [],
				message: 'No fees found for this student’s subjects',
			};
		}

		return { success: true, fees };
	} catch (error) {
		return handleServiceError(error, 'Failed to fetch fees for student');
	}
};
export const getFeeByIdService = async (feeId: string) => {
	try {
		const fee = await Fee.findById(feeId)
			.populate('gradeId', 'gradeName')
			.populate('subjectId', 'subjectName')
			.populate('teacherId', 'name email');
		if (!fee) throw new Error('Fee not found');
		return { success: true, fee };
	} catch (error: any) {
		return handleServiceError(error, 'Failed to fetch fee');
	}
};

// **Update a fee remittance**
export const updateFeeRemittanceService = async (
	remittanceId: string,
	remittanceData: any
) => {
	try {
		const remittance = await FeeRemittance.findById(remittanceId);
		if (!remittance) throw new Error('Fee remittance not found');

		const [studentExists, parentExists, feeExists] = await Promise.all([
			Student.exists({ _id: remittanceData.studentId }),
			Parent.exists({ _id: remittanceData.parentId }),
			Fee.exists({ _id: remittanceData.feeId }),
		]);

		if (!studentExists) throw new Error('Invalid student ID');
		if (!parentExists) throw new Error('Invalid parent ID');
		if (!feeExists) throw new Error('Invalid fee ID');

		Object.assign(remittance, remittanceData);
		await remittance.save();
		return { success: true, remittance };
	} catch (error: any) {
		return handleServiceError(error, 'Failed to update fee remittance');
	}
};

// ... (keep the existing handleServiceError function)
const handleServiceError = (error: any, message: string) => {
	console.error(error);
	return {
		success: false,
		error: error.message || message,
		details: error.details || [],
	};
};
