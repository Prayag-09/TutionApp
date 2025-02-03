"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const quizService_1 = __importDefault(require("../services/quizService"));
const QuizController = {
    // Create a new quiz.
    addQuiz: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, gradeSubjectId, teacherId, timeLimit, maxMark, questions } = req.body;
            const quiz = yield quizService_1.default.createQuiz({
                name,
                gradeSubjectId,
                teacherId,
                timeLimit,
                maxMark,
                questions,
            });
            res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .json({ message: 'Quiz added successfully', quiz });
        }
        catch (error) {
            next(error);
        }
    }),
    // Update an existing quiz.
    editQuiz: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { quizId, name, gradeSubjectId, teacherId, timeLimit, maxMark, questions, } = req.body;
            const quiz = yield quizService_1.default.updateQuiz(quizId, {
                name,
                gradeSubjectId,
                teacherId,
                timeLimit,
                maxMark,
                questions,
            });
            if (!quiz) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Quiz not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Quiz updated successfully', quiz });
        }
        catch (error) {
            next(error);
        }
    }),
    // Archive a quiz.
    archiveQuiz: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { quizId } = req.body;
            const quiz = yield quizService_1.default.changeQuizStatus(quizId, 'Archived');
            if (!quiz) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Quiz not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Quiz archived successfully', quiz });
        }
        catch (error) {
            next(error);
        }
    }),
    // Restore a quiz.
    restoreQuiz: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { quizId } = req.body;
            const quiz = yield quizService_1.default.changeQuizStatus(quizId, 'Live');
            if (!quiz) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Quiz not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Quiz restored successfully', quiz });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = QuizController;
