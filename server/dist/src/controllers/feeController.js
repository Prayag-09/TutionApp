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
const feeService_1 = __importDefault(require("../services/feeService"));
class FeeController {
}
_a = FeeController;
FeeController.addFee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fee = yield feeService_1.default.createFee(req.body);
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: 'Fee added successfully', fee });
    }
    catch (error) {
        next(error);
    }
});
FeeController.editFee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fee = yield feeService_1.default.updateFee(req.body.feeId, req.body);
        if (!fee) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Fee not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Fee updated successfully', fee });
    }
    catch (error) {
        next(error);
    }
});
FeeController.archiveFee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fee = yield feeService_1.default.changeFeeStatus(req.body.feeId, 'Archived');
        if (!fee) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Fee not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Fee archived successfully', fee });
    }
    catch (error) {
        next(error);
    }
});
FeeController.restoreFee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fee = yield feeService_1.default.changeFeeStatus(req.body.feeId, 'Live');
        if (!fee) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Fee not found' });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Fee restored successfully', fee });
    }
    catch (error) {
        next(error);
    }
});
exports.default = FeeController;
