import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['Principal', 'Teacher', 'Parent', 'Student'],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

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

const gradeSubjectSchema = new mongoose.Schema(
	{
		gradeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Grade',
			required: true,
		},
		subjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
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
			zipCode: {
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
				gradeSubjectId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'GradeSubject',
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

const studentSubjectSchema = new mongoose.Schema(
	{
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
		subjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
		},
		teacherId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
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

const feeSchema = new mongoose.Schema(
	{
		gradeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Grade',
			required: true,
		},
		subjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
		},
		teacherId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		validFrom: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const feeRemittanceSchema = new mongoose.Schema(
	{
		studentSubjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'StudentSubject',
			required: true,
		},
		month: {
			type: Number,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const assignmentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		gradeSubjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GradeSubject',
			required: true,
		},
		teacherId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
		},
		details: {
			type: String,
			required: true,
			trim: true,
		},
		file: {
			type: String,
			trim: true,
		},
		maximumMark: {
			type: Number,
			required: true,
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

const quizSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		gradeSubjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GradeSubject',
			required: true,
		},
		teacherId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
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

const quizStudentSchema = new mongoose.Schema(
	{
		quizId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Quiz',
			required: true,
		},
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
		mark: {
			type: Number,
		},
		status: {
			type: String,
			enum: ['Attempted', 'Not Attempted'],
			default: 'Not Attempted',
		},
	},
	{
		timestamps: true,
	}
);

const examSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		gradeSubjectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GradeSubject',
			required: true,
		},
		teacherId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
		},
		maxMark: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const marksSchema = new mongoose.Schema(
	{
		examId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Exam',
			required: true,
		},
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
		mark: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Marks = mongoose.model('Marks', marksSchema);
export const Exam = mongoose.model('Exam', examSchema);
export const QuizStudent = mongoose.model('QuizStudent', quizStudentSchema);
export const Subject = mongoose.model('Subject', subjectSchema);
export const Grade = mongoose.model('Grade', gradeSchema);
export const GradeSubject = mongoose.model('GradeSubject', gradeSubjectSchema);
export const Teacher = mongoose.model('Teacher', teacherSchema);
export const Parent = mongoose.model('Parent', parentSchema);
export const Student = mongoose.model('Student', studentSchema);
export const StudentSubject = mongoose.model(
	'StudentSubject',
	studentSubjectSchema
);
export const Fee = mongoose.model('Fee', feeSchema);
export const FeeRemittance = mongoose.model(
	'FeeRemittance',
	feeRemittanceSchema
);
export const Assignment = mongoose.model('Assignment', assignmentSchema);
export const User = mongoose.model('User', userSchema);
export const Quiz = mongoose.model('Quiz', quizSchema);
