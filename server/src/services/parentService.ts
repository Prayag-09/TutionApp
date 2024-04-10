import { Parent } from '../models/schema';

class ParentService {
	static async createParent(data: {
		name: string;
		mobileNumber: string;
		email: string;
		residentialAddress: string;
		city: string;
		state: string;
		country: string;
		status: string;
	}): Promise<any> {
		try {
			const parent = new Parent(data);
			return await parent.save();
		} catch (error) {
			throw new Error('Failed to create parent');
		}
	}

	static async updateParent(
		parentId: string,
		data: Partial<{
			name: string;
			mobileNumber: string;
			email: string;
			residentialAddress: string;
			city: string;
			state: string;
			country: string;
			status: string;
		}>
	): Promise<any> {
		try {
			const parent = await Parent.findByIdAndUpdate(parentId, data, {
				new: true,
			});
			return parent;
		} catch (error) {
			throw new Error('Failed to update parent');
		}
	}

	static async changeParentStatus(
		parentId: string,
		status: 'Live' | 'Archived'
	): Promise<any> {
		try {
			const parent = await Parent.findByIdAndUpdate(
				parentId,
				{ status },
				{ new: true }
			);
			return parent;
		} catch (error) {
			throw new Error(`Failed to change parent status to ${status}`);
		}
	}
}

export default ParentService;
