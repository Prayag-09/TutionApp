import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import subjectService from '../services/subjectService';

const SubjectController = {
	addSubject: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { name, description, status } = req.body;
			const subject = await subjectService.createSubject({
				name,
				description,
				status,
			});
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Subject added successfully', subject });
		} catch (error) {
			next(error);
		}
	},

	editSubject: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { subjectId, name, description, status } = req.body;
			const subject = await subjectService.updateSubject(subjectId, {
				name,
				description,
				status,
			});
			if (!subject) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Subject not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Subject updated successfully', subject });
		} catch (error) {
			next(error);
		}
	},

	archiveSubject: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { subjectId } = req.body;
			const subject = await subjectService.changeSubjectStatus(
				subjectId,
				'Archive'
			);
			if (!subject) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Subject not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Subject archived successfully', subject });
		} catch (error) {
			next(error);
		}
	},

	restoreSubject: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { subjectId } = req.body;
			const subject = await subjectService.changeSubjectStatus(
				subjectId,
				'Live'
			);
			if (!subject) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Subject not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Subject restored successfully', subject });
		} catch (error) {
			next(error);
		}
	},
};

export default SubjectController;
