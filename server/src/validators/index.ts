import { z } from 'zod';

export const subjectValidator = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	description: z.string().trim().optional(),
	status: z.enum(['Live', 'Archive']).default('Live'),
});

export const gradeValidator = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	description: z.string().trim().optional(),
	status: z.enum(['Live', 'Archive']).default('Live'),
	subjects: z.array(
		z.object({
			subjectId: z.string().min(1, 'Subject ID is required'),
			status: z.enum(['Live', 'Archive']).default('Live'),
		})
	),
});
export const assignmentSchema = z.object({
	title: z.string({ required_error: 'Title is required' }),
	description: z.string().optional(),
	dueDate: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
		.optional(),
});

export const quizSchema = z.object({
	name: z.string({ required_error: 'Quiz name is required' }),
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
				question: z.string({ required_error: 'Question is required' }),
				options: z
					.array(z.string({ required_error: 'Option is required' }))
					.min(2, 'At least two options required'),
				correctAnswer: z.number({
					required_error: 'Correct answer index is required',
				}),
			})
		)
		.min(1, 'At least one question is required'),
});

export const userSchema = z.object({
	name: z.string({ required_error: 'Name is required' }),
	email: z.string().email('Invalid email format'),
});

export const feeSchema = z.object({
	feeName: z
		.string({ required_error: 'Fee name is required' })
		.min(1, 'Fee name is required')
		.trim(),
	amount: z
		.number({ required_error: 'Amount is required' })
		.positive('Amount must be positive'),
	dueDate: z
		.string({ required_error: 'Due date is required' })
		.refine((val) => !isNaN(Date.parse(val)), {
			message: 'Invalid due date format',
		}),
	feeType: z.enum(['Tuition', 'Hostel', 'Other'], {
		required_error: 'Fee type is required',
	}),
	description: z.string().optional(),
});

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

export const loginSchema = z.object({
	username: z.string({ required_error: 'Username is required' }),
	password: z.string({ required_error: 'Password is required' }),
});
