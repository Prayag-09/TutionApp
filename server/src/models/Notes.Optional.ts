import mongoose, { Schema, Document } from 'mongoose';

export interface INotes extends Document {
	title: string;
	gradeSubject: mongoose.Types.ObjectId;
	teacher: mongoose.Types.ObjectId;
	fileUrl: string;
	fileType: 'video' | 'audio' | 'text';
}

const NotesSchema: Schema = new Schema<INotes>(
	{
		title: { type: String, required: true },
		gradeSubject: {
			type: Schema.Types.ObjectId,
			ref: 'GradeSubject',
			required: true,
		},
		teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
		fileUrl: { type: String, required: true },
		fileType: {
			type: String,
			enum: ['video', 'audio', 'text'],
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<INotes>('Notes', NotesSchema);
