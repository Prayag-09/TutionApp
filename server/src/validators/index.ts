import { z } from 'zod';

// ✅ Common Date Validation
const dateSchema = z
	.string()
	.refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' });

// ✅ Enum Values for Status
const statusEnum = z.enum(['Live', 'Archive']);
const activeStatusEnum = z.enum(['Live', 'Archive', 'Inactive']);
const feeTypeEnum = z.enum(['Tuition', 'Hostel', 'Other']);

// ✅ User Role Enum
const userRoleEnum = z.enum(['Principal', 'Teacher', 'Student', 'Parent']);

// ✅ Subject Validator
export const subjectValidator = z.object({
	name: z.string().min(1, 'Subject name is required').trim(),
	description: z.string().trim().optional(),
	status: statusEnum.default('Live'),
});

// ✅ Grade Validator
export const gradeValidator = z.object({
	name: z.string().min(1, 'Grade name is required').trim(),
	description: z.string().trim().optional(),
	status: statusEnum.default('Live'),
	subjects: z
		.array(
			z.object({
				subjectId: z.string().min(1, 'Subject ID is required'),
				status: statusEnum.default('Live'),
			})
		)
		.min(1, 'At least one subject is required'),
});

// ✅ Assignment Validator
export const assignmentValidator = z.object({
	name: z.string({ required_error: 'Assignment title is required' }).trim(),
	gradeSubjectId: z.string({ required_error: 'Grade Subject ID is required' }),
	teacherId: z.string({ required_error: 'Teacher ID is required' }),
	details: z.string().min(1, 'Assignment details are required').trim(),
	file: z.string().optional(),
	maximumMark: z.number().positive('Maximum mark must be positive'),
	status: statusEnum.default('Live'),
});

// ✅ Quiz Validator
export const quizValidator = z.object({
	name: z.string({ required_error: 'Quiz name is required' }).trim(),
	gradeSubjectId: z.string({ required_error: 'Grade Subject ID is required' }),
	teacherId: z.string({ required_error: 'Teacher ID is required' }),
	timeLimit: z
		.number({ required_error: 'Time limit is required' })
		.min(1, 'Time limit must be at least 1 minute'),
	maxMark: z
		.number({ required_error: 'Maximum mark is required' })
		.min(0, 'Max mark must be non-negative'),
	questions: z
		.array(
			z.object({
				question: z.string({ required_error: 'Question is required' }).trim(),
				options: z
					.array(z.string({ required_error: 'Option is required' }).trim())
					.min(2, 'At least two options required'),
				correctOption: z.number({
					required_error: 'Correct answer index is required',
				}),
			})
		)
		.min(1, 'At least one question is required'),
	status: statusEnum.default('Live'),
});

// ✅ Quiz Attempt Validator (Student's Attempt)
export const quizStudentValidator = z.object({
	quizId: z.string({ required_error: 'Quiz ID is required' }),
	studentId: z.string({ required_error: 'Student ID is required' }),
	mark: z.number().optional(),
	status: z.enum(['Attempted', 'Not Attempted']).default('Not Attempted'),
});

// ✅ Exam Validator
export const examValidator = z.object({
	name: z.string({ required_error: 'Exam name is required' }).trim(),
	gradeSubjectId: z.string({ required_error: 'Grade Subject ID is required' }),
	teacherId: z.string({ required_error: 'Teacher ID is required' }),
	maxMark: z
		.number({ required_error: 'Maximum mark is required' })
		.min(0, 'Maximum mark must be positive'),
});

// ✅ Marks Validator (Exam Results)
export const marksValidator = z.object({
	examId: z.string({ required_error: 'Exam ID is required' }),
	studentId: z.string({ required_error: 'Student ID is required' }),
	mark: z
		.number({ required_error: 'Mark is required' })
		.min(0, 'Mark must be positive'),
});

// ✅ User Validator
export const userValidator = z.object({
	name: z.string({ required_error: 'Name is required' }).trim(),
	email: z.string().email('Invalid email format'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	role: userRoleEnum,
});

// ✅ Fee Validator
export const feeValidator = z.object({
	feeName: z.string().min(1, 'Fee name is required').trim(),
	amount: z.number().positive('Amount must be positive'),
	dueDate: dateSchema,
	feeType: feeTypeEnum,
	description: z.string().optional(),
});

// ✅ Grade-Subject Validator (Mapping subjects to grades)
export const gradeSubjectValidator = z.object({
	gradeId: z.string().min(1, 'Grade ID is required'),
	subjectId: z.string().min(1, 'Subject ID is required'),
	status: statusEnum.default('Live'),
});

// ✅ Student-Subject Validator (Mapping students to subjects and teachers)
export const studentSubjectValidator = z.object({
	studentId: z.string().min(1, 'Student ID is required'),
	subjectId: z.string().min(1, 'Subject ID is required'),
	teacherId: z.string().min(1, 'Teacher ID is required'),
	status: statusEnum.default('Live'),
});

// ✅ Login Validator
export const loginValidator = z.object({
	email: z.string().min(1, 'Email is required'),
	password: z.string().min(1, 'Password is required'),
});

// ✅ Middleware to Validate Request Data
export const validate = (schema: z.ZodSchema<any>) => {
	return (req: any, res: any, next: any) => {
		try {
			schema.parse(req.body);
			next();
		} catch (err: any) {
			res.status(400).json({ errors: err.errors });
		}
	};
};
