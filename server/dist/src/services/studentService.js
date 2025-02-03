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
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../database/schema");
class StudentService {
    static createStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = new schema_1.Student(Object.assign(Object.assign({}, data), { status: 'Active' }));
                return yield student.save();
            }
            catch (error) {
                throw new Error('Failed to create student');
            }
        });
    }
    static updateStudent(studentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield schema_1.Student.findByIdAndUpdate(studentId, data, {
                    new: true,
                });
                return student;
            }
            catch (error) {
                throw new Error('Failed to update student');
            }
        });
    }
    static changeStudentStatus(studentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield schema_1.Student.findByIdAndUpdate(studentId, { status }, { new: true });
                return student;
            }
            catch (error) {
                throw new Error(`Failed to change student status to ${status}`);
            }
        });
    }
}
exports.default = StudentService;
