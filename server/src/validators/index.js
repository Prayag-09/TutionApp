const z = require('zod');

export const subjectValidator = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	description: z.string().optional().trim(),
	status: z.enum(['Live', 'Archive']).default('Live'),
});

export const gradeValidator = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	description: z.string().optional().trim(),
	status: z.enum(['Live', 'Archive']).default('Live'),
	subjects: z.array(
		z.object({
			subjectId: z.string().min(1, 'Subject ID is required'),
			status: z.enum(['Live', 'Archive']).default('Live'),
		})
	),
});
