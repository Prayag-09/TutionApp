import { Request, Response } from 'express';
import { StudentSubject } from '../models/StudentSubject';

// Add new student-subject relation (POST)
export const addStudentSubject = async (req: Request, res: Response) => {
	try {
		const { studentId, subjectId } = req.body;
		const newStudentSubject = new StudentSubject({
			studentId,
			subjectId,
			status: 'Live',
		});
		await newStudentSubject.save();

		res
			.status(201)
			.json({ message: 'Student-Subject relation added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding student-subject relation' });
	}
};

// Get all student-subject relations (GET)
export const getAllStudentSubjects = async (_req: Request, res: Response) => {
	try {
		const studentSubjects = await StudentSubject.find();
		res.json(studentSubjects);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching student-subject relations' });
	}
};

// Edit student-subject relation status (Live / Archived) (EDIT)
export const updateStudentSubjectStatus = async (
	req: Request,
	res: Response
) => {
	try {
		const { studentSubjectId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const studentSubject = await StudentSubject.findByIdAndUpdate(
			studentSubjectId,
			{ status },
			{ new: true }
		);
		if (!studentSubject)
			return res
				.status(404)
				.json({ error: 'Student-Subject relation not found' });

		res.json({
			message: `Student-Subject status updated to ${status}`,
			studentSubject,
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Error updating student-subject relation status' });
	}
};
