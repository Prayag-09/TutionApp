import { Request, Response } from 'express';
import { Grade } from '../models/Grade';

// Add new grade (POST)
export const addGrade = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const newGrade = new Grade({ name, description, status: 'Live' });
		await newGrade.save();

		res.status(201).json({ message: 'Grade added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding grade' });
	}
};

// Get all grades (GET)
export const getAllGrades = async (_req: Request, res: Response) => {
	try {
		const grades = await Grade.find();
		res.json(grades);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching grades' });
	}
};

// Edit grade status (Live / Archived) (EDIT)
export const updateGradeStatus = async (req: Request, res: Response) => {
	try {
		const { gradeId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const grade = await Grade.findByIdAndUpdate(
			gradeId,
			{ status },
			{ new: true }
		);
		if (!grade) return res.status(404).json({ error: 'Grade not found' });

		res.json({ message: `Grade status updated to ${status}`, grade });
	} catch (error) {
		res.status(500).json({ error: 'Error updating grade status' });
	}
};
