import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import StudentService from '../services/studentService';

class StudentController {
	static addStudent = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const student = await StudentService.createStudent(req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Student added successfully', student });
		} catch (error) {
			next(error);
		}
	};

	static editStudent = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const student = await StudentService.updateStudent(
				req.body.studentId,
				req.body
			);
			if (!student) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Student not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Student updated successfully', student });
		} catch (error) {
			next(error);
		}
	};

	static archiveStudent = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const student = await StudentService.changeStudentStatus(
				req.body.studentId,
				'Archived'
			);
			if (!student) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Student not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Student archived successfully', student });
		} catch (error) {
			next(error);
		}
	};

	static restoreStudent = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const student = await StudentService.changeStudentStatus(
				req.body.studentId,
				'Active'
			);
			if (!student) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Student not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Student restored successfully', student });
		} catch (error) {
			next(error);
		}
	};
}

export default StudentController;
