import { Request, Response } from 'express';
import { Fee } from '../models/Fee';

// Add new fee (POST)
export const addFee = async (req: Request, res: Response) => {
	try {
		const { amount, studentId, dueDate } = req.body;
		const newFee = new Fee({ amount, studentId, dueDate, status: 'Live' });
		await newFee.save();

		res.status(201).json({ message: 'Fee added successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error adding fee' });
	}
};

// Get all fees (GET)
export const getAllFees = async (_req: Request, res: Response) => {
	try {
		const fees = await Fee.find();
		res.json(fees);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching fees' });
	}
};

// Edit fee status (Live / Archived) (EDIT)
export const updateFeeStatus = async (req: Request, res: Response) => {
	try {
		const { feeId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const fee = await Fee.findByIdAndUpdate(feeId, { status }, { new: true });
		if (!fee) return res.status(404).json({ error: 'Fee not found' });

		res.json({ message: `Fee status updated to ${status}`, fee });
	} catch (error) {
		res.status(500).json({ error: 'Error updating fee status' });
	}
};
