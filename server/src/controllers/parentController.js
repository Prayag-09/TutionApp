const Parent = require('../database/schema').Parent;

const ParentController = {
	async addParent(req, res) {
		try {
			const {
				name,
				mobileNumber,
				email,
				residentialAddress,
				city,
				state,
				country,
				status,
			} = req.body;
			const parent = new Parent({
				name,
				mobileNumber,
				email,
				residentialAddress,
				city,
				state,
				country,
				status,
			});
			await parent.save();
			res.status(201).json({ message: 'Parent added successfully', parent });
		} catch (error) {
			res.status(500).json({ message: 'Failed to add parent', error });
		}
	},

	async editParent(req, res) {
		try {
			const {
				parentId,
				name,
				mobileNumber,
				email,
				residentialAddress,
				city,
				state,
				country,
				status,
			} = req.body;
			const parent = await Parent.findByIdAndUpdate(
				parentId,
				{
					name,
					mobileNumber,
					email,
					residentialAddress,
					city,
					state,
					country,
					status,
				},
				{ new: true }
			);
			if (!parent) return res.status(404).json({ message: 'Parent not found' });
			res.status(200).json({ message: 'Parent updated successfully', parent });
		} catch (error) {
			res.status(500).json({ message: 'Failed to update parent', error });
		}
	},

	async archiveParent(req, res) {
		try {
			const { parentId } = req.body;
			const parent = await Parent.findByIdAndUpdate(
				parentId,
				{ status: 'Archived' },
				{ new: true }
			);
			if (!parent) return res.status(404).json({ message: 'Parent not found' });
			res.status(200).json({ message: 'Parent archived successfully', parent });
		} catch (error) {
			res.status(500).json({ message: 'Failed to archive parent', error });
		}
	},

	async restoreParent(req, res) {
		try {
			const { parentId } = req.body;
			const parent = await Parent.findByIdAndUpdate(
				parentId,
				{ status: 'Live' },
				{ new: true }
			);
			if (!parent) return res.status(404).json({ message: 'Parent not found' });
			res.status(200).json({ message: 'Parent restored successfully', parent });
		} catch (error) {
			res.status(500).json({ message: 'Failed to restore parent', error });
		}
	},
};

module.exports = ParentController;
