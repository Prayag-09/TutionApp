import { Grade } from '../models/schema';

class GradeService {
	static async createGrade(data: {
		name: string;
		description: string;
		subjects: string[];
		status: string;
	}): Promise<any> {
		try {
			const grade = new Grade(data);
			return await grade.save();
		} catch (error) {
			throw new Error('Failed to create grade');
		}
	}

	static async updateGrade(
		gradeId: string,
		data: Partial<{
			name: string;
			description: string;
			subjects: string[];
			status: string;
		}>
	): Promise<any> {
		try {
			const grade = await Grade.findByIdAndUpdate(gradeId, data, { new: true });
			return grade;
		} catch (error) {
			throw new Error('Failed to update grade');
		}
	}

	static async changeGradeStatus(
		gradeId: string,
		status: 'Live' | 'Archived'
	): Promise<any> {
		try {
			const grade = await Grade.findByIdAndUpdate(
				gradeId,
				{ status },
				{ new: true }
			);
			return grade;
		} catch (error) {
			throw new Error(`Failed to change grade status to ${status}`);
		}
	}
}

export default GradeService;
