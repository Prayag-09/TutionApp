import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeacherService from '../services/teacherService';

const TeacherController = {
	addTeacher: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const teacher = await TeacherService.createTeacher(req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Teacher added successfully', teacher });
		} catch (error) {
			next(error);
		}
	},

	editTeacher: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const teacher = await TeacherService.updateTeacher(
				req.body.teacherId,
				req.body
			);
			if (!teacher) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Teacher not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Teacher updated successfully', teacher });
		} catch (error) {
			next(error);
		}
	},

	archiveTeacher: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const teacher = await TeacherService.changeTeacherStatus(
				req.body.teacherId,
				'Archived'
			);
			if (!teacher) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Teacher not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Teacher archived successfully', teacher });
		} catch (error) {
			next(error);
		}
	},

	restoreTeacher: async (req: Request, res: Response, next: NextFunction) : Promise<any> 	=> {
		try {
			const teacher = await TeacherService.changeTeacherStatus(
				req.body.teacherId,
				'Active'
			);
			if (!teacher) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Teacher not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Teacher restored successfully', teacher });
		} catch (error) {
			next(error);
		}
	},
};

export default TeacherController;
