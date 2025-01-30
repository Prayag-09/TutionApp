const Teacher = require('../database/schema').Teacher;
import { Request, Response } from 'express';

const TeacherController = {
	async addTeacher(req: Request, res: Response) {
		try {
			const {
				name,
				mobileNumber,
				email,
				residentialAddress,
				city,
				state,
				country,
				qualification,
				status,
				gradeSubjects,
			} = req.body;

			const teacher = new Teacher({
				name,
				mobileNumber,
				email,
				residentialAddress,
				city,
				state,
				country,
				qualification,
				status,
				gradeSubjects,
			});

			await teacher.save();
			res.status(201).json({ message: 'Teacher added successfully', teacher });
		} catch (error) {
			res.status(500).json({ message: 'Failed to add teacher', error });
		}
	},

	async editTeacher(req: Request, res: Response) {
		try {
			const { teacherId, name, mobileNumber, email, status } = req.body;
			const teacher = await Teacher.findByIdAndUpdate(
				teacherId,
				{ name, mobileNumber, email, status },
				{ new: true }
			);
			if (!teacher)
				return res.status(404).json({ message: 'Teacher not found' });
			res
				.status(200)
				.json({ message: 'Teacher updated successfully', teacher });
		} catch (error) {
			res.status(500).json({ message: 'Failed to update teacher', error });
		}
	},

	async archiveTeacher(req: Request, res: Response) {
		try {
			const { teacherId } = req.body;
			const teacher = await Teacher.findByIdAndUpdate(
				teacherId,
				{ status: 'Archived' },
				{ new: true }
			);
			if (!teacher)
				return res.status(404).json({ message: 'Teacher not found' });
			res
				.status(200)
				.json({ message: 'Teacher archived successfully', teacher });
		} catch (error) {
			res.status(500).json({ message: 'Failed to archive teacher', error });
		}
	},

	async restoreTeacher(req: Request, res: Response) {
		try {
			const { teacherId } = req.body;
			const teacher = await Teacher.findByIdAndUpdate(
				teacherId,
				{ status: 'Active' },
				{ new: true }
			);
			if (!teacher)
				return res.status(404).json({ message: 'Teacher not found' });
			res
				.status(200)
				.json({ message: 'Teacher restored successfully', teacher });
		} catch (error) {
			res.status(500).json({ message: 'Failed to restore teacher', error });
		}
	},
};

module.exports = TeacherController;
