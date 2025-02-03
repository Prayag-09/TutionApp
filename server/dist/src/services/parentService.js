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
class ParentService {
    static createParent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parent = new schema_1.Parent(data);
                return yield parent.save();
            }
            catch (error) {
                throw new Error('Failed to create parent');
            }
        });
    }
    static updateParent(parentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parent = yield schema_1.Parent.findByIdAndUpdate(parentId, data, {
                    new: true,
                });
                return parent;
            }
            catch (error) {
                throw new Error('Failed to update parent');
            }
        });
    }
    static changeParentStatus(parentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parent = yield schema_1.Parent.findByIdAndUpdate(parentId, { status }, { new: true });
                return parent;
            }
            catch (error) {
                throw new Error(`Failed to change parent status to ${status}`);
            }
        });
    }
}
exports.default = ParentService;
