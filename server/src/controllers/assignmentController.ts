import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AssignmentService from '../services/assignmentService';

class AssignmentController {
	static addAssignment = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const assignment = await AssignmentService.createAssignment(req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ message: 'Assignment added successfully', assignment });
		} catch (error) {
			next(error);
		}
	};

	static editAssignment = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const { assignmentId, ...updateData } = req.body;
			const assignment = await AssignmentService.updateAssignment(
				assignmentId,
				updateData
			);
			if (!assignment) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Assignment not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Assignment updated successfully', assignment });
		} catch (error) {
			next(error);
		}
	};

	static archiveAssignment = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const { assignmentId } = req.body;
			const assignment = await AssignmentService.changeAssignmentStatus(
				assignmentId,
				'Archived'
			);
			if (!assignment) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Assignment not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Assignment archived successfully', assignment });
		} catch (error) {
			next(error);
		}
	};

	static restoreAssignment = async (
		req: Request,
		res: Response,
		next: NextFunction
	) : Promise<any> => {
		try {
			const { assignmentId } = req.body;
			const assignment = await AssignmentService.changeAssignmentStatus(
				assignmentId,
				'Live'
			);
			if (!assignment) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'Assignment not found' });
			}
			res
				.status(StatusCodes.OK)
				.json({ message: 'Assignment restored successfully', assignment });
		} catch (error) {
			next(error);
		}
	};
}

export default AssignmentController;
