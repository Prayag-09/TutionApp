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
const gradeService_1 = __importDefault(require("../services/gradeService"));
class GradeController {
}
_a = GradeController;
GradeController.addGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grade = yield gradeService_1.default.createGrade(req.body);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: 'Grade added successfully', grade });
    }
    catch (error) {
        next(error);
    }
});
GradeController.editGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grade = yield gradeService_1.default.updateGrade(req.body.gradeId, req.body);
        if (!grade) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Grade not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Grade updated successfully', grade });
    }
    catch (error) {
        next(error);
    }
});
GradeController.archiveGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grade = yield gradeService_1.default.changeGradeStatus(req.body.gradeId, 'Archived');
        if (!grade) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Grade not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Grade archived successfully', grade });
    }
    catch (error) {
        next(error);
    }
});
GradeController.restoreGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grade = yield gradeService_1.default.changeGradeStatus(req.body.gradeId, 'Live');
        if (!grade) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Grade not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Grade restored successfully', grade });
    }
    catch (error) {
        next(error);
    }
});
exports.default = GradeController;
