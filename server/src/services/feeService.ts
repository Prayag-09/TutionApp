import { Fee } from '../models/schema';

class FeeService {
	static async createFee(data: {
		gradeId: string;
		amount: number;
		dueDate: Date;
		status: string;
	}): Promise<any> {
		try {
			const fee = new Fee(data);
			return await fee.save();
		} catch (error) {
			throw new Error('Failed to create fee');
		}
	}

	static async updateFee(
		feeId: string,
		data: Partial<{
			gradeId: string;
			amount: number;
			dueDate: Date;
			status: string;
		}>
	): Promise<any> {
		try {
			const fee = await Fee.findByIdAndUpdate(feeId, data, { new: true });
			return fee;
		} catch (error) {
			throw new Error('Failed to update fee');
		}
	}

	static async changeFeeStatus(
		feeId: string,
		status: 'Live' | 'Archived'
	): Promise<any> {
		try {
			const fee = await Fee.findByIdAndUpdate(feeId, { status }, { new: true });
			return fee;
		} catch (error) {
			throw new Error(`Failed to change fee status to ${status}`);
		}
	}
}

export default FeeService;
