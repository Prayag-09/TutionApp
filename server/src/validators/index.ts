import { z } from 'zod';

const statusEnum = z.enum(['Live', 'Archive']);
const userRoleEnum = z.enum(['principal', 'teacher', 'student', 'parent']);

export const subjectValidator = z.object({
	name: z.string().min(1, 'Subject name is required').trim(),
	description: z.string().trim().optional(),
	status: statusEnum.default('Live'),
});

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

export const assignmentValidator = z.object({
	name: z.string().min(1, 'Assignment title is required').trim(),
	gradeSubjectId: z.string().min(1, 'Grade Subject ID is required'),
	teacherId: z.string().min(1, 'Teacher ID is required'),
	details: z.string().min(1, 'Assignment details are required').trim(),
	file: z.string().optional(),
	maximumMark: z.number().positive('Maximum mark must be positive'),
	status: statusEnum.default('Live'),
});

export const quizValidator = z.object({
	name: z.string().min(1, 'Quiz name is required').trim(),
	gradeSubjectId: z.string().min(1, 'Grade Subject ID is required'),
	teacherId: z.string().min(1, 'Teacher ID is required'),
	timeLimit: z.number().min(1, 'Time limit must be at least 1 minute'),
	maxMark: z.number().min(0, 'Max mark must be non-negative'),
	questions: z
		.array(
			z.object({
				question: z.string().min(1, 'Question is required').trim(),
				options: z.array(z.string().min(1, 'Option is required').trim()).min(2),
				correctOption: z.number(),
			})
		)
		.min(1, 'At least one question is required'),
	status: statusEnum.default('Live'),
});

export const quizStudentValidator = z.object({
	quizId: z.string().min(1, 'Quiz ID is required'),
	studentId: z.string().min(1, 'Student ID is required'),
	mark: z.number().optional(),
	status: z.enum(['Attempted', 'Not Attempted']).default('Not Attempted'),
});

export const examValidator = z.object({
	name: z.string().min(1, 'Exam name is required').trim(),
	gradeSubjectId: z.string().min(1, 'Grade Subject ID is required'),
	teacherId: z.string().min(1, 'Teacher ID is required'),
	maxMark: z.number().min(0, 'Maximum mark must be positive'),
});

export const marksValidator = z.object({
	examId: z.string().min(1, 'Exam ID is required'),
	studentId: z.string().min(1, 'Student ID is required'),
	mark: z.number().min(0, 'Mark must be positive'),
});

export const userValidator = z.object({
	email: z.string().email('Invalid email format'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	role: userRoleEnum,
});

export const feeValidator = z.object({
	feeName: z.string().min(1, 'Fee name is required').trim(),
	gradeId: z.string().min(1, 'Grade is required'),
	subjectId: z.string().min(1, 'Subject is required'),
	teacherId: z.string().min(1, 'Teacher is required'),
	amount: z.number().positive('Amount must be positive'),
	status: z.enum(['pending', 'paid', 'canceled']).optional(),
});

const dateSchema = z
	.string()
	.refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' });

const paymentMethodEnum = z.enum(['Cash', 'Online', 'Bank Transfer']);

export const feeRemittanceValidator = z.object({
	studentId: z.string().min(1, 'Student ID is required'),
	feeId: z.string().min(1, 'Fee ID is required'),
	parentId: z.string().min(1, 'Parent ID is required'),
	amountPaid: z.number().positive('Amount paid must be a positive number'),
	paymentDate: dateSchema.optional(),
	paymentMethod: paymentMethodEnum,
	receiptNumber: z.string().min(1, 'Receipt number is required').trim(),
});

export const gradeSubjectValidator = z.object({
	gradeId: z.string().min(1, 'Grade ID is required'),
	subjectId: z.string().min(1, 'Subject ID is required'),
	status: statusEnum.default('Live'),
});

export const studentSubjectValidator = z.object({
	studentId: z.string().min(1, 'Student ID is required'),
	subjectId: z.string().min(1, 'Subject ID is required'),
	teacherId: z.string().min(1, 'Teacher ID is required'),
	status: statusEnum.default('Live'),
});

export const loginValidator = z.object({
	email: z.string().min(1, 'Email is required'),
	password: z.string().min(1, 'Password is required'),
});

export const teacherValidator = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	mobile: z.string().min(10, 'Mobile number is required').trim(),
	email: z.string().email('Invalid email format'),
	residentialAddress: z.object({
		address: z.string().min(1, 'Address is required').trim(),
		city: z.string().min(1, 'City is required').trim(),
		state: z.string().min(1, 'State is required').trim(),
		country: z.string().min(1, 'Country is required').trim(),
		zipCode: z.string().optional(),
	}),
	qualification: z.string().trim().optional(),
	status: statusEnum.default('Live'),
	gradeSubjects: z
		.array(
			z.object({
				gradeSubjectId: z.string().min(1, 'Grade Subject ID is required'),
			})
		)
		.optional(),
});

export const studentValidator = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	mobile: z.string().trim().optional(),
	email: z.string().email('Invalid email format').optional(),
	residentialAddress: z.object({
		address: z.string().min(1, 'Address is required').trim(),
		city: z.string().min(1, 'City is required').trim(),
		state: z.string().min(1, 'State is required').trim(),
		country: z.string().min(1, 'Country is required').trim(),
	}),
	parentId: z.string().min(1, 'Parent ID is required'),
	gradeId: z.string().min(1, 'Grade ID is required'),
	subjects: z
		.array(
			z.object({
				subjectId: z.string().min(1, 'Subject ID is required'),
				teacherId: z.string().min(1, 'Teacher ID is required'),
				status: statusEnum.default('Live'),
			})
		)
		.optional(),
	status: statusEnum.default('Live'),
});

export const parentValidator = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	mobile: z.string().min(10, 'Mobile number is required').trim(),
	email: z.string().email('Invalid email format').optional(),
	residentialAddress: z.object({
		address: z.string().min(1, 'Address is required').trim(),
		city: z.string().min(1, 'City is required').trim(),
		state: z.string().min(1, 'State is required').trim(),
		country: z.string().min(1, 'Country is required').trim(),
	}),
	status: statusEnum.default('Live'),
});

export const validate =
	(schema: z.ZodSchema) => (req: any, res: any, next: any) => {
		try {
			schema.parse(req.body);
			next();
		} catch (err: any) {
			res.status(400).json({ errors: err.errors });
		}
	};
