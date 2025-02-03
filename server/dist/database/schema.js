"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = exports.User = exports.Assignment = exports.FeeRemittance = exports.Fee = exports.StudentSubject = exports.Student = exports.Parent = exports.Teacher = exports.GradeSubject = exports.Grade = exports.Subject = exports.QuizStudent = exports.Exam = exports.Marks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Subject Schema
const subjectSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
// Grade Schema
const gradeSchema = new mongoose_1.default.Schema({
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
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Subject',
            },
            status: {
                type: String,
                enum: ['Live', 'Archive'],
                default: 'Live',
            },
        },
    ],
}, {
    timestamps: true,
});
const gradeSubjectSchema = new mongoose_1.default.Schema({
    gradeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Grade',
        required: true,
    },
    subjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    status: {
        type: String,
        enum: ['Live', 'Archive'],
        default: 'Live',
    },
}, {
    timestamps: true,
});
const teacherSchema = new mongoose_1.default.Schema({
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
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'GradeSubject',
            },
        },
    ],
}, {
    timestamps: true,
});
const parentSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const studentSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Parent',
    },
    gradeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Grade',
    },
    subjects: [
        {
            subjectId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Subject',
            },
            teacherId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const studentSubjectSchema = new mongoose_1.default.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    subjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    status: {
        type: String,
        enum: ['Live', 'Archive'],
        default: 'Live',
    },
}, {
    timestamps: true,
});
const feeSchema = new mongoose_1.default.Schema({
    gradeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Grade',
        required: true,
    },
    subjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const feeRemittanceSchema = new mongoose_1.default.Schema({
    studentSubjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const assignmentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    gradeSubjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'GradeSubject',
        required: true,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const userSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const quizSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    gradeSubjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'GradeSubject',
        required: true,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const quizStudentSchema = new mongoose_1.default.Schema({
    quizId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const examSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    gradeSubjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'GradeSubject',
        required: true,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    maxMark: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const marksSchema = new mongoose_1.default.Schema({
    examId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    mark: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Marks = mongoose_1.default.model('Marks', marksSchema);
exports.Exam = mongoose_1.default.model('Exam', examSchema);
exports.QuizStudent = mongoose_1.default.model('QuizStudent', quizStudentSchema);
exports.Subject = mongoose_1.default.model('Subject', subjectSchema);
exports.Grade = mongoose_1.default.model('Grade', gradeSchema);
exports.GradeSubject = mongoose_1.default.model('GradeSubject', gradeSubjectSchema);
exports.Teacher = mongoose_1.default.model('Teacher', teacherSchema);
exports.Parent = mongoose_1.default.model('Parent', parentSchema);
exports.Student = mongoose_1.default.model('Student', studentSchema);
exports.StudentSubject = mongoose_1.default.model('StudentSubject', studentSubjectSchema);
exports.Fee = mongoose_1.default.model('Fee', feeSchema);
exports.FeeRemittance = mongoose_1.default.model('FeeRemittance', feeRemittanceSchema);
exports.Assignment = mongoose_1.default.model('Assignment', assignmentSchema);
exports.User = mongoose_1.default.model('User', userSchema);
exports.Quiz = mongoose_1.default.model('Quiz', quizSchema);
