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
const parentService_1 = __importDefault(require("../services/parentService"));
const ParentController = {
    addParent: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parent = yield parentService_1.default.createParent(req.body);
            res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .json({ message: 'Parent added successfully', parent });
        }
        catch (error) {
            next(error);
        }
    }),
    editParent: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parent = yield parentService_1.default.updateParent(req.body.parentId, req.body);
            if (!parent) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Parent not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Parent updated successfully', parent });
        }
        catch (error) {
            next(error);
        }
    }),
    archiveParent: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parent = yield parentService_1.default.changeParentStatus(req.body.parentId, 'Archived');
            if (!parent) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Parent not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Parent archived successfully', parent });
        }
        catch (error) {
            next(error);
        }
    }),
    restoreParent: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parent = yield parentService_1.default.changeParentStatus(req.body.parentId, 'Live');
            if (!parent) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: 'Parent not found' });
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: 'Parent restored successfully', parent });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = ParentController;
