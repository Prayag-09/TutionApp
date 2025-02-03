import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import GradeService from '../services/gradeService';

class GradeController {
	static addGrade = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
		try {
			const grade = await GradeService.createGrade(req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Grade added successfully', grade });
		} catch (error) {
			next(error);
		}
	};

	static editGrade = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const grade = await GradeService.updateGrade(req.body.gradeId, req.body);
			if (!grade) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Grade not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Grade updated successfully', grade });
		} catch (error) {
			next(error);
		}
	};

	static archiveGrade = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const grade = await GradeService.changeGradeStatus(
				req.body.gradeId,
				'Archived'
			);
			if (!grade) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Grade not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Grade archived successfully', grade });
		} catch (error) {
			next(error);
		}
	};

	static restoreGrade = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const grade = await GradeService.changeGradeStatus(
				req.body.gradeId,
				'Live'
			);
			if (!grade) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Grade not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Grade restored successfully', grade });
		} catch (error) {
			next(error);
		}
	};
}

export default GradeController;
