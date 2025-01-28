const Assignment = require('../database/schema').Assignment;

const AssignmentController = {
	async addAssignment(req, res) {
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
			res
				.status(201)
				.json({ message: 'Assignment added successfully', assignment });
		} catch (error) {
			res.status(500).json({ message: 'Failed to add assignment', error });
		}
	},

	async editAssignment(req, res) {
		try {
			const { assignmentId, title, description, dueDate, gradeId } = req.body;
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				{ title, description, dueDate, gradeId },
				{ new: true }
			);
			if (!assignment)
				return res.status(404).json({ message: 'Assignment not found' });
			res
				.status(200)
				.json({ message: 'Assignment updated successfully', assignment });
		} catch (error) {
			res.status(500).json({ message: 'Failed to update assignment', error });
		}
	},

	async archiveAssignment(req, res) {
		try {
			const { assignmentId } = req.body;
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				{ status: 'Archived' },
				{ new: true }
			);
			if (!assignment)
				return res.status(404).json({ message: 'Assignment not found' });
			res
				.status(200)
				.json({ message: 'Assignment archived successfully', assignment });
		} catch (error) {
			res.status(500).json({ message: 'Failed to archive assignment', error });
		}
	},

	async restoreAssignment(req, res) {
		try {
			const { assignmentId } = req.body;
			const assignment = await Assignment.findByIdAndUpdate(
				assignmentId,
				{ status: 'Live' },
				{ new: true }
			);
			if (!assignment)
				return res.status(404).json({ message: 'Assignment not found' });
			res
				.status(200)
				.json({ message: 'Assignment restored successfully', assignment });
		} catch (error) {
			res.status(500).json({ message: 'Failed to restore assignment', error });
		}
	},
};

module.exports = AssignmentController;
