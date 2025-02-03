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
const teacherService_1 = __importDefault(require("../services/teacherService"));
const TeacherController = {
    addTeacher: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const teacher = yield teacherService_1.default.createTeacher(req.body);
            res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .json({ message: 'Teacher added successfully', teacher });
        }
        catch (error) {
            next(error);
        }
    }),
    editTeacher: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const teacher = yield teacherService_1.default.updateTeacher(req.body.teacherId, req.body);
            if (!teacher) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Teacher not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Teacher updated successfully', teacher });
        }
        catch (error) {
            next(error);
        }
    }),
    archiveTeacher: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const teacher = yield teacherService_1.default.changeTeacherStatus(req.body.teacherId, 'Archived');
            if (!teacher) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Teacher not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Teacher archived successfully', teacher });
        }
        catch (error) {
            next(error);
        }
    }),
    restoreTeacher: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const teacher = yield teacherService_1.default.changeTeacherStatus(req.body.teacherId, 'Active');
            if (!teacher) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Teacher not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Teacher restored successfully', teacher });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = TeacherController;
