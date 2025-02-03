"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.feeSchema = exports.userSchema = exports.quizSchema = exports.assignmentSchema = exports.gradeValidator = exports.subjectValidator = void 0;
const zod_1 = require("zod");
exports.subjectValidator = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').trim(),
    description: zod_1.z.string().trim().optional(),
    status: zod_1.z.enum(['Live', 'Archive']).default('Live'),
});
exports.gradeValidator = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').trim(),
    description: zod_1.z.string().trim().optional(),
    status: zod_1.z.enum(['Live', 'Archive']).default('Live'),
    subjects: zod_1.z.array(zod_1.z.object({
        subjectId: zod_1.z.string().min(1, 'Subject ID is required'),
        status: zod_1.z.enum(['Live', 'Archive']).default('Live'),
    })),
});
exports.assignmentSchema = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required' }),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
        .optional(),
});
exports.quizSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Quiz name is required' }),
    gradeSubjectId: zod_1.z.string({ required_error: 'Grade Subject ID is required' }),
    teacherId: zod_1.z.string({ required_error: 'Teacher ID is required' }),
    timeLimit: zod_1.z
        .number({ required_error: 'Time limit is required' })
        .min(1, 'Time limit must be at least 1 minute'),
    maxMark: zod_1.z
        .number({ required_error: 'Maximum mark is required' })
        .min(0, 'Max mark must be non-negative'),
    questions: zod_1.z
        .array(zod_1.z.object({
        question: zod_1.z.string({ required_error: 'Question is required' }),
        options: zod_1.z
            .array(zod_1.z.string({ required_error: 'Option is required' }))
            .min(2, 'At least two options required'),
        correctAnswer: zod_1.z.number({
            required_error: 'Correct answer index is required',
        }),
    }))
        .min(1, 'At least one question is required'),
});
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }),
    email: zod_1.z.string().email('Invalid email format'),
});
exports.feeSchema = zod_1.z.object({
    feeName: zod_1.z
        .string({ required_error: 'Fee name is required' })
        .min(1, 'Fee name is required')
        .trim(),
    amount: zod_1.z
        .number({ required_error: 'Amount is required' })
        .positive('Amount must be positive'),
    dueDate: zod_1.z
        .string({ required_error: 'Due date is required' })
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid due date format',
    }),
    feeType: zod_1.z.enum(['Tuition', 'Hostel', 'Other'], {
        required_error: 'Fee type is required',
    }),
    description: zod_1.z.string().optional(),
});
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            res.status(400).json({ errors: err.errors });
        }
    };
};
exports.validate = validate;
