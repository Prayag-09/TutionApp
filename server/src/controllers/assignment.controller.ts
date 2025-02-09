import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';

// Add new assignment (POST)
export const addAssignment = async (req: Request, res: Response) => {
	try {
		const { title, description, dueDate, teacherId, subjectId, gradeId } =
			req.body;
		const newAssignment = new Assignment({
			title,
			description,
			dueDate,
			teacherId,
			subjectId,
			gradeId,
			status: 'Live',
		});
		await newAssignment.save();

		res.status(201).json({ message: 'Assignment added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding assignment' });
	}
};

// Get all assignments (GET)
export const getAllAssignments = async (_req: Request, res: Response) => {
	try {
		const assignments = await Assignment.find();
		res.json(assignments);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching assignments' });
	}
};

// Edit assignment status (Live / Archived) (EDIT)
export const updateAssignmentStatus = async (req: Request, res: Response) => {
	try {
		const { assignmentId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const assignment = await Assignment.findByIdAndUpdate(
			assignmentId,
			{ status },
			{ new: true }
		);
		if (!assignment)
			return res.status(404).json({ error: 'Assignment not found' });

		res.json({ message: `Assignment status updated to ${status}`, assignment });
	} catch (error) {
		res.status(500).json({ error: 'Error updating assignment status' });
	}
};
