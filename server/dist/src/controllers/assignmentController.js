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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const assignmentService_1 = __importDefault(require("../services/assignmentService"));
class AssignmentController {
}
_a = AssignmentController;
AssignmentController.addAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignment = yield assignmentService_1.default.createAssignment(req.body);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: 'Assignment added successfully', assignment });
    }
    catch (error) {
        next(error);
    }
});
AssignmentController.editAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _b = req.body, { assignmentId } = _b, updateData = __rest(_b, ["assignmentId"]);
        const assignment = yield assignmentService_1.default.updateAssignment(assignmentId, updateData);
        if (!assignment) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Assignment not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Assignment updated successfully', assignment });
    }
    catch (error) {
        next(error);
    }
});
AssignmentController.archiveAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assignmentId } = req.body;
        const assignment = yield assignmentService_1.default.changeAssignmentStatus(assignmentId, 'Archived');
        if (!assignment) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Assignment not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Assignment archived successfully', assignment });
    }
    catch (error) {
        next(error);
    }
});
AssignmentController.restoreAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assignmentId } = req.body;
        const assignment = yield assignmentService_1.default.changeAssignmentStatus(assignmentId, 'Live');
        if (!assignment) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Assignment not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Assignment restored successfully', assignment });
    }
    catch (error) {
        next(error);
    }
});
exports.default = AssignmentController;
