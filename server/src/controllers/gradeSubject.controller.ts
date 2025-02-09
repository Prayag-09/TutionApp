import { Request, Response } from 'express';
import { GradeSubject } from '../models/GradeSubject';

// Add new grade-subject relation (POST)
export const addGradeSubject = async (req: Request, res: Response) => {
	try {
		const { gradeId, subjectId, teacherId } = req.body;
		const newGradeSubject = new GradeSubject({
			gradeId,
			subjectId,
			teacherId,
			status: 'Live',
		});
		await newGradeSubject.save();

		res
			.status(201)
			.json({ message: 'Grade-Subject relation added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding grade-subject relation' });
	}
};

// Get all grade-subject relations (GET)
export const getAllGradeSubjects = async (_req: Request, res: Response) => {
	try {
		const gradeSubjects = await GradeSubject.find();
		res.json(gradeSubjects);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching grade-subject relations' });
	}
};

// Edit grade-subject relation status (Live / Archived) (EDIT)
export const updateGradeSubjectStatus = async (req: Request, res: Response) => {
	try {
		const { gradeSubjectId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const gradeSubject = await GradeSubject.findByIdAndUpdate(
			gradeSubjectId,
			{ status },
			{ new: true }
		);
		if (!gradeSubject)
			return res
				.status(404)
				.json({ error: 'Grade-Subject relation not found' });

		res.json({
			message: `Grade-Subject status updated to ${status}`,
			gradeSubject,
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Error updating grade-subject relation status' });
	}
};
