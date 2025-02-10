import { Request, Response } from 'express';
import { Fee } from '../models/Fee';
import { z } from 'zod';

// **Add New Fee**
export const addFee = async (req: Request, res: Response) => {
	try {
		const { amount, studentId, dueDate } = req.body;

		const newFee = new Fee({ amount, studentId, dueDate, status: 'Live' });
		await newFee.save();

		res.status(201).json({ message: 'Fee added successfully', fee: newFee });
	} catch (error) {
		console.error('Error adding fee:', error);
	}
};

// **Get All Fees**
export const getAllFees = async (_req: Request, res: Response) => {
	try {
		const fees = await Fee.find().populate('studentId', 'name email');
		res.json({ fees });
	} catch (error) {
		console.error('Error fetching fees:', error);
		res.status(500).json({ error: 'Error fetching fees' });
	}
};

// **Update Fee Status**
export const updateFeeStatus = async (req: Request, res: Response) => {
	try {
		const { feeId } = req.params;
		const { status } = req.body.status;

		const fee = await Fee.findByIdAndUpdate(feeId, { status }, { new: true });
		if (!fee) return res.status(404).json({ error: 'Fee not found' });

		res.json({ message: `Fee status updated to ${status}`, fee });
	} catch (error) {
		console.error('Error updating fee status:', error);
	}
};
