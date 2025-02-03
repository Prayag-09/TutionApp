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
class FeeService {
    static createFee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fee = new schema_1.Fee(data);
                return yield fee.save();
            }
            catch (error) {
                throw new Error('Failed to create fee');
            }
        });
    }
    static updateFee(feeId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fee = yield schema_1.Fee.findByIdAndUpdate(feeId, data, { new: true });
                return fee;
            }
            catch (error) {
                throw new Error('Failed to update fee');
            }
        });
    }
    static changeFeeStatus(feeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fee = yield schema_1.Fee.findByIdAndUpdate(feeId, { status }, { new: true });
                return fee;
            }
            catch (error) {
                throw new Error(`Failed to change fee status to ${status}`);
            }
        });
    }
}
exports.default = FeeService;
