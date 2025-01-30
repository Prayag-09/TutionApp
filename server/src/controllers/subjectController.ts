const Subject = require('../database/schema').Subject;
import { Request, Response } from 'express';

const SubjectController = {
	async addSubject(req: Request, res: Response) {
		try {
			const { name, description, status } = req.body;
			const subject = new Subject({ name, description, status });
			await subject.save();
			res.status(201).json({ message: 'Subject added successfully', subject });
		} catch (error) {
			res.status(500).json({ message: 'Failed to add subject', error });
		}
	},

	async editSubject(req: Request, res: Response) {
		try {
			const { subjectId, name, description, status } = req.body;
			const subject = await Subject.findByIdAndUpdate(
				subjectId,
				{ name, description, status },
				{ new: true }
			);
			if (!subject)
				return res.status(404).json({ message: 'Subject not found' });
			res
				.status(200)
				.json({ message: 'Subject updated successfully', subject });
		} catch (error) {
			res.status(500).json({ message: 'Failed to update subject', error });
		}
	},

	async archiveSubject(req: Request, res: Response) {
		try {
			const { subjectId } = req.body;
			const subject = await Subject.findByIdAndUpdate(
				subjectId,
				{ status: 'Archived' },
				{ new: true }
			);
			if (!subject)
				return res.status(404).json({ message: 'Subject not found' });
			res
				.status(200)
				.json({ message: 'Subject archived successfully', subject });
		} catch (error) {
			res.status(500).json({ message: 'Failed to archive subject', error });
		}
	},

	async restoreSubject(req: Request, res: Response) {
		try {
			const { subjectId } = req.body;
			const subject = await Subject.findByIdAndUpdate(
				subjectId,
				{ status: 'Active' },
				{ new: true }
			);
			if (!subject)
				return res.status(404).json({ message: 'Subject not found' });
			res
				.status(200)
				.json({ message: 'Subject restored successfully', subject });
		} catch (error) {
			res.status(500).json({ message: 'Failed to restore subject', error });
		}
	},
};

module.exports = SubjectController;
