import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ParentService from '../services/parentService';

const ParentController = {
	addParent: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const parent = await ParentService.createParent(req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Parent added successfully', parent });
		} catch (error) {
			next(error);
		}
	},

	editParent: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const parent = await ParentService.updateParent(
				req.body.parentId,
				req.body
			);
			if (!parent) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Parent not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Parent updated successfully', parent });
		} catch (error) {
			next(error);
		}
	},

	archiveParent: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const parent = await ParentService.changeParentStatus(
				req.body.parentId,
				'Archived'
			);
			if (!parent) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Parent not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Parent archived successfully', parent });
		} catch (error) {
			next(error);
		}
	},

	restoreParent: async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const parent = await ParentService.changeParentStatus(
				req.body.parentId,
				'Live'
			);
			if (!parent) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Parent not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Parent restored successfully', parent });
		} catch (error) {
			next(error);
		}
	},
};

export default ParentController;
