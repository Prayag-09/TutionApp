import mongoose, { Schema, Document } from 'mongoose';

interface Address {
	address: string;
	city: string;
	state: string;
	country: string;
	zipCode?: string;
}

export interface IParent extends Document {
	name: string;
	mobile: string;
	email?: string;
	residentialAddress: Address;
	status: 'Live' | 'Archive';
	studentIds: mongoose.Types.ObjectId[];
}

const parentSchema = new Schema<IParent>(
	{
		name: { type: String, required: true, trim: true },
		mobile: { type: String, required: true, unique: true, trim: true },
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			sparse: true, // Allows uniqueness but doesn't enforce if email is not provided
			match: [/\S+@\S+\.\S+/, 'Invalid email format'],
		},
		residentialAddress: {
			address: { type: String, required: true, trim: true },
			city: { type: String, required: true, trim: true },
			state: { type: String, required: true, trim: true },
			country: { type: String, required: true, trim: true },
			zipCode: { type: String, trim: true },
		},
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);
export const Parent = mongoose.model<IParent>('Parent', parentSchema);
