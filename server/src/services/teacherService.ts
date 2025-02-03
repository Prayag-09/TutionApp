import { Teacher } from '../../database/schema';

class TeacherService {
	static async createTeacher(data: {
		name: string;
		mobileNumber: string;
		email: string;
		residentialAddress: string;
		city: string;
		state: string;
		country: string;
		qualification: string;
		status: string;
		gradeSubjects: string[];
	}): Promise<any> {
		try {
			const teacher = new Teacher(data);
			return await teacher.save();
		} catch (error) {
			throw new Error('Failed to create teacher');
		}
	}

	static async updateTeacher(
		teacherId: string,
		data: Partial<{
			name: string;
			mobileNumber: string;
			email: string;
			status: string;
		}>
	): Promise<any> {
		try {
			const teacher = await Teacher.findByIdAndUpdate(teacherId, data, {
				new: true,
			});
			return teacher;
		} catch (error) {
			throw new Error('Failed to update teacher');
		}
	}

	static async changeTeacherStatus(
		teacherId: string,
		status: 'Active' | 'Archived'
	): Promise<any> {
		try {
			const teacher = await Teacher.findByIdAndUpdate(
				teacherId,
				{ status },
				{ new: true }
			);
			return teacher;
		} catch (error) {
			throw new Error(`Failed to change teacher status to ${status}`);
		}
	}
}

export default TeacherService;
