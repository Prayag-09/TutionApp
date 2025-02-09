import { Request, Response } from 'express';
import { Marks } from '../models/Marks';

// Add marks (POST)
export const addMarks = async (req: Request, res: Response) => {
	try {
		const { studentId, examId, marksObtained } = req.body;
		const newMarks = new Marks({
			studentId,
			examId,
			marksObtained,
			status: 'Live',
		});
		await newMarks.save();

		res.status(201).json({ message: 'Marks added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding marks' });
	}
};

// Get all marks (GET)
export const getAllMarks = async (_req: Request, res: Response) => {
	try {
		const marks = await Marks.find();
		res.json(marks);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching marks' });
	}
};

// Edit marks status (Live / Archived) (EDIT)
export const updateMarksStatus = async (req: Request, res: Response) => {
	try {
		const { marksId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const marks = await Marks.findByIdAndUpdate(
			marksId,
			{ status },
			{ new: true }
		);
		if (!marks) return res.status(404).json({ error: 'Marks not found' });

		res.json({ message: `Marks status updated to ${status}`, marks });
	} catch (error) {
		res.status(500).json({ error: 'Error updating marks status' });
	}
};
