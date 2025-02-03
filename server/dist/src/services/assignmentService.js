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
class AssignmentService {
    static createAssignment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignment = new schema_1.Assignment(Object.assign(Object.assign({}, data), { status: 'Live' }));
                return yield assignment.save();
            }
            catch (error) {
                throw new Error('Failed to create assignment');
            }
        });
    }
    static updateAssignment(assignmentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignment = yield schema_1.Assignment.findByIdAndUpdate(assignmentId, data, { new: true });
                return assignment;
            }
            catch (error) {
                throw new Error('Failed to update assignment');
            }
        });
    }
    static changeAssignmentStatus(assignmentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignment = yield schema_1.Assignment.findByIdAndUpdate(assignmentId, { status }, { new: true });
                return assignment;
            }
            catch (error) {
                throw new Error(`Failed to change assignment status to ${status}`);
            }
        });
    }
}
exports.default = AssignmentService;
