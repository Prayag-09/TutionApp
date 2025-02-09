import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
	student: mongoose.Types.ObjectId;
	date: Date;
	status: 'Present' | 'Absent';
}

const AttendanceSchema: Schema = new Schema<IAttendance>(
	{
		student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
		date: { type: Date, required: true },
		status: { type: String, enum: ['Present', 'Absent'], required: true },
	},
	{ timestamps: true }
);

export const Attendance = mongoose.model<IAttendance>(
	'Attendance',
	AttendanceSchema
);
