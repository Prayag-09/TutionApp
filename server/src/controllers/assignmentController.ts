import { Request, Response } from 'express';
import { Assignment } from '../../database/schema';

const AssignmentController = {
	async addAssignment(req: Request, res: Response): Promise<Response | void> {
		try {
			const { title, description, dueDate, gradeId } = req.body;
			const assignment = new Assignment({
				title,
				description,
				dueDate,
				gradeId,
				status: 'Live',
			});
			await assignment.save();
			return res
				.status(201)
				.json({ message: 'Assignment added successfully', assignment });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Failed to add assignment', error });
		}
	},

	async editAssignment(req: Request, res: Response): Promise<Response | void> {
		try {
			const { assignmentId, title, description, dueDate, gradeId } = req.body;
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				{ title, description, dueDate, gradeId },
				{ new: true }
			);
			if (!assignment) {
				return res.status(404).json({ message: 'Assignment not found' });
			}
			return res
				.status(200)
				.json({ message: 'Assignment updated successfully', assignment });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Failed to update assignment', error });
		}
	},

	async archiveAssignment(
		req: Request,
		res: Response
	): Promise<Response | void> {
		try {
			const { assignmentId } = req.body;
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				{ status: 'Archived' },
				{ new: true }
			);
			if (!assignment) {
				return res.status(404).json({ message: 'Assignment not found' });
			}
			return res
				.status(200)
				.json({ message: 'Assignment archived successfully', assignment });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Failed to archive assignment', error });
		}
	},

	async restoreAssignment(
		req: Request,
		res: Response
	): Promise<Response | void> {
		try {
			const { assignmentId } = req.body;
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				{ status: 'Live' },
				{ new: true }
			);
			if (!assignment) {
				return res.status(404).json({ message: 'Assignment not found' });
			}
			return res
				.status(200)
				.json({ message: 'Assignment restored successfully', assignment });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Failed to restore assignment', error });
		}
	},
};

export default AssignmentController;
