import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	email: string;
	password: string;
	role: 'principal' | 'teacher' | 'parent' | 'student';
}

const userSchema = new Schema<IUser>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['principal', 'teacher', 'parent', 'student'],
			required: true,
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
