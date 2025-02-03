import { Student } from '../../database/schema';

class StudentService {
	static async createStudent(data: {
		name: string;
		email: string;
		phone: string;
		gradeId: string;
	}): Promise<any> {
		try {
			const student = new Student({
				...data,
				status: 'Active',
			});
			return await student.save();
		} catch (error) {
			throw new Error('Failed to create student');
		}
	}

	static async updateStudent(
		studentId: string,
		data: Partial<{
			name: string;
			email: string;
			phone: string;
			gradeId: string;
		}>
	): Promise<any> {
		try {
			const student = await Student.findByIdAndUpdate(studentId, data, {
				new: true,
			});
			return student;
		} catch (error) {
			throw new Error('Failed to update student');
		}
	}

	static async changeStudentStatus(
		studentId: string,
		status: 'Active' | 'Archived'
	): Promise<any> {
		try {
			const student = await Student.findByIdAndUpdate(
				studentId,
				{ status },
				{ new: true }
			);
			return student;
		} catch (error) {
			throw new Error(`Failed to change student status to ${status}`);
		}
	}
}

export default StudentService;
