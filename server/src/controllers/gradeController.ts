const Grade = require('../database/schema').Grade;
import { Request, Response } from 'express';

const GradeController = {
	async addGrade(req: Request, res: Response) {
		try {
			const { name, description, subjects, status } = req.body;
			const grade = new Grade({ name, description, subjects, status });
			await grade.save();
			res.status(201).json({ message: 'Grade added successfully', grade });
		} catch (error) {
			res.status(500).json({ message: 'Failed to add grade', error });
		}
	},

	async editGrade(req: Request, res: Response) {
		try {
			const { gradeId, name, description, subjects, status } = req.body;
			const grade = await Grade.findByIdAndUpdate(
				gradeId,
				{ name, description, subjects, status },
				{ new: true }
			);
			if (!grade) return res.status(404).json({ message: 'Grade not found' });
			res.status(200).json({ message: 'Grade updated successfully', grade });
		} catch (error) {
			res.status(500).json({ message: 'Failed to update grade', error });
		}
	},

	async archiveGrade(req: Request, res: Response) {
		try {
			const { gradeId } = req.body;
			const grade = await Grade.findByIdAndUpdate(
				gradeId,
				{ status: 'Archived' },
				{ new: true }
			);
			if (!grade) return res.status(404).json({ message: 'Grade not found' });
			res.status(200).json({ message: 'Grade archived successfully', grade });
		} catch (error) {
			res.status(500).json({ message: 'Failed to archive grade', error });
		}
	},

	async restoreGrade(req: Request, res: Response) {
		try {
			const { gradeId } = req.body;
			const grade = await Grade.findByIdAndUpdate(
				gradeId,
				{ status: 'Live' },
				{ new: true }
			);
			if (!grade) return res.status(404).json({ message: 'Grade not found' });
			res.status(200).json({ message: 'Grade restored successfully', grade });
		} catch (error) {
			res.status(500).json({ message: 'Failed to restore grade', error });
		}
	},
};

module.exports = GradeController;
