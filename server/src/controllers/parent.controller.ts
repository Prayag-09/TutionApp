import { Request, Response } from 'express';
import { Parent } from '../models/Parent';

// Register a new parent (POST)
export const registerParent = async (req: Request, res: Response) => {
	try {
		const { name, email, phone } = req.body;
		const newParent = new Parent({ name, email, phone, status: 'Live' });
		await newParent.save();

		res.status(201).json({ message: 'Parent registered successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error registering parent' });
	}
};

// Get all parents (GET)
export const getAllParents = async (_req: Request, res: Response) => {
	try {
		const parents = await Parent.find();
		res.json(parents);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching parents' });
	}
};

// Edit parent status (Live / Archived) (EDIT)
export const updateParentStatus = async (req: Request, res: Response) => {
	try {
		const { parentId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const parent = await Parent.findByIdAndUpdate(
			parentId,
			{ status },
			{ new: true }
		);
		if (!parent) return res.status(404).json({ error: 'Parent not found' });

		res.json({ message: `Parent status updated to ${status}`, parent });
	} catch (error) {
		res.status(500).json({ error: 'Error updating parent status' });
	}
};
