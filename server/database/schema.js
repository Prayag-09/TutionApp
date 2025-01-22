import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			enum: ['Live', 'Archive'],
			default: 'Live',
		},
	},
	{
		timestamps: true,
	}
);

const gradeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			enum: ['Live', 'Archive'],
			default: 'Live',
		},
		subjects: [
			{
				subjectId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Subject',
				},
				status: {
					type: String,
					enum: ['Live', 'Archive'],
					default: 'Live',
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const teacherSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		residentialAddress: {
			address: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
			country: {
				type: String,
			},
		},
		qualification: {
			type: String,
		},
		status: {
			type: String,
			enum: ['Live', 'Archive'],
			default: 'Live',
		},
		gradeSubjects: [
			{
				gradeId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Grade',
				},
				subjectId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Subject',
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const parentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
		residentialAddress: {
			address: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
			country: {
				type: String,
			},
		},
		status: {
			type: String,
			enum: ['Live', 'Archive'],
			default: 'Live',
		},
	},
	{
		timestamps: true,
	}
);

const studentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
		},
		email: {
			type: String,
		},
		residentialAddress: {
			address: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
			country: {
				type: String,
			},
		},
		parentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Parent',
		},
		gradeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Grade',
		},
		subjects: [
			{
				subjectId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Subject',
				},
				teacherId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Teacher',
				},
				status: {
					type: String,
					enum: ['Live', 'Archive'],
					default: 'Live',
				},
			},
		],
		status: {
			type: String,
			enum: ['Live', 'Archive'],
			default: 'Live',
		},
	},
	{
		timestamps: true,
	}
);

const attendanceSchema = new mongoose.Schema(
	{
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ['Present', 'Absent'],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const userSchema = new mongoose.Schema(
	{
		userType: {
			type: String,
			enum: ['Principal', 'Teacher', 'Parent', 'Student'],
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		permissions: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

const quizSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		gradeSubjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GradeSubject',
		},
		teacherId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
		},
		timeLimit: {
			type: Number,
		},
		maxMark: {
			type: Number,
		},
		questions: [
			{
				question: {
					type: String,
					required: true,
				},
				options: [
					{
						type: String,
					},
				],
				correctOption: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Subject = mongoose.model('Subject', subjectSchema);
export const Grade = mongoose.model('Grade', gradeSchema);
export const Teacher = mongoose.model('Teacher', teacherSchema);
export const Parent = mongoose.model('Parent', parentSchema);
export const Student = mongoose.model('Student', studentSchema);
export const Attendance = mongoose.model('Attendance', attendanceSchema);
export const User = mongoose.model('User', userSchema);
export const Quiz = mongoose.model('Quiz', quizSchema);

// const {
// 	Subject,
// 	Grade,
// 	Teacher,
// 	Parent,
// 	Student,
// 	Attendance,
// 	User,
// 	Quiz,
// } = require('../database/schema.js');
