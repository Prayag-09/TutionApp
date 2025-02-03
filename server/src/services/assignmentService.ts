import { Assignment } from '../../database/schema';

class AssignmentService {
	static async createAssignment(data: {
		title: string;
		description: string;
		dueDate: Date;
		gradeId: string;
	}): Promise<any> {
		try {
			const assignment = new Assignment({
				...data,
				status: 'Live',
			});
			return await assignment.save();
		} catch (error) {
			throw new Error('Failed to create assignment');
		}
	}

	static async updateAssignment(
		assignmentId: string,
		data: Partial<{
			title: string;
			description: string;
			dueDate: Date;
			gradeId: string;
		}>
	): Promise<any> {
		try {
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				data,
				{ new: true }
			);
			return assignment;
		} catch (error) {
			throw new Error('Failed to update assignment');
		}
	}

	static async changeAssignmentStatus(
		assignmentId: string,
		status: 'Live' | 'Archived'
	): Promise<any> {
		try {
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				{ status },
				{ new: true }
			);
			return assignment;
		} catch (error) {
			throw new Error(`Failed to change assignment status to ${status}`);
		}
	}
}

export default AssignmentService;
