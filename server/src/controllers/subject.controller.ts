import { Request, Response } from 'express';
import { Subject } from '../models/Subject';

// Add new subject (POST)
export const addSubject = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const newSubject = new Subject({ name, description, status: 'Live' });
		await newSubject.save();

		res.status(201).json({ message: 'Subject added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding subject' });
	}
};

// Get all subjects (GET)
export const getAllSubjects = async (_req: Request, res: Response) => {
	try {
		const subjects = await Subject.find();
		res.json(subjects);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching subjects' });
	}
};

// Edit subject status (Live / Archived) (EDIT)
export const updateSubjectStatus = async (req: Request, res: Response) => {
	try {
		const { subjectId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const subject = await Subject.findByIdAndUpdate(
			subjectId,
			{ status },
			{ new: true }
		);
		if (!subject) return res.status(404).json({ error: 'Subject not found' });

		res.json({ message: `Subject status updated to ${status}`, subject });
	} catch (error) {
		res.status(500).json({ error: 'Error updating subject status' });
	}
};
