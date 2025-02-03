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
const subjectService_1 = __importDefault(require("../services/subjectService"));
const SubjectController = {
    addSubject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description, status } = req.body;
            const subject = yield subjectService_1.default.createSubject({
                name,
                description,
                status,
            });
            res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .json({ message: 'Subject added successfully', subject });
        }
        catch (error) {
            next(error);
        }
    }),
    editSubject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { subjectId, name, description, status } = req.body;
            const subject = yield subjectService_1.default.updateSubject(subjectId, {
                name,
                description,
                status,
            });
            if (!subject) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Subject not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Subject updated successfully', subject });
        }
        catch (error) {
            next(error);
        }
    }),
    archiveSubject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { subjectId } = req.body;
            const subject = yield subjectService_1.default.changeSubjectStatus(subjectId, 'Archive');
            if (!subject) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Subject not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Subject archived successfully', subject });
        }
        catch (error) {
            next(error);
        }
    }),
    restoreSubject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { subjectId } = req.body;
            const subject = yield subjectService_1.default.changeSubjectStatus(subjectId, 'Live');
            if (!subject) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Subject not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Subject restored successfully', subject });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = SubjectController;
