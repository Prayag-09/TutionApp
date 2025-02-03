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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const studentService_1 = __importDefault(require("../services/studentService"));
class StudentController {
}
_a = StudentController;
StudentController.addStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentService_1.default.createStudent(req.body);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: 'Student added successfully', student });
    }
    catch (error) {
        next(error);
    }
});
StudentController.editStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentService_1.default.updateStudent(req.body.studentId, req.body);
        if (!student) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Student not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Student updated successfully', student });
    }
    catch (error) {
        next(error);
    }
});
StudentController.archiveStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentService_1.default.changeStudentStatus(req.body.studentId, 'Archived');
        if (!student) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Student not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Student archived successfully', student });
    }
    catch (error) {
        next(error);
    }
});
StudentController.restoreStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentService_1.default.changeStudentStatus(req.body.studentId, 'Active');
        if (!student) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Student not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Student restored successfully', student });
    }
    catch (error) {
        next(error);
    }
});
exports.default = StudentController;
