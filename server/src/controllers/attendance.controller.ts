import { Request, Response } from 'express';
import {Attendance} from '../models/Attendance';

// Record attendance (POST)
export const recordAttendance = async (req: Request, res: Response) => {
	try {
		const { studentId, date, status } = req.body;
		const newAttendance = new Attendance({ studentId, date, status: 'Live' });
		await newAttendance.save();

		res.status(201).json({ message: 'Attendance recorded successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Error recording attendance' });
	}
};

// Get all attendance records (GET)
export const getAllAttendance = async (_req: Request, res: Response) => {
	try {
		const attendanceRecords = await Attendance.find();
		res.json(attendanceRecords);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching attendance records' });
	}
};

// Edit attendance status (Live / Archived) (EDIT)
export const updateAttendanceStatus = async (req: Request, res: Response) => {
	try {
		const { attendanceId } = req.params;
		const { status } = req.body;

		if (!['Live', 'Archived'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const attendance = await Attendance.findByIdAndUpdate(
			attendanceId,
			{ status },
			{ new: true }
		);
		if (!attendance)
			return res.status(404).json({ error: 'Attendance record not found' });

		res.json({ message: `Attendance status updated to ${status}`, attendance });
	} catch (error) {
		res.status(500).json({ error: 'Error updating attendance status' });
	}
};
