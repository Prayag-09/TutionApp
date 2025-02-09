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
}

const parentSchema = new Schema<IParent>(
	{
		name: { type: String, required: true },
		mobile: { type: String, required: true },
		email: { type: String },
		residentialAddress: {
			address: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
		},
		status: { type: String, enum: ['Live', 'Archive'], default: 'Live' },
	},
	{ timestamps: true }
);

export const Parent = mongoose.model<IParent>('Parent', parentSchema);
