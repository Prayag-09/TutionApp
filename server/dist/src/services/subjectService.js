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
const createSubject = (subjectData) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = new schema_1.Subject(subjectData);
    yield subject.save();
    return subject;
});
const updateSubject = (subjectId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield schema_1.Subject.findByIdAndUpdate(subjectId, updateData, { new: true });
});
const changeSubjectStatus = (subjectId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield schema_1.Subject.findByIdAndUpdate(subjectId, { status }, { new: true });
});
exports.default = {
    createSubject,
    updateSubject,
    changeSubjectStatus,
};
