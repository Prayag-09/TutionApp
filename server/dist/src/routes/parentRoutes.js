"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parentController_1 = __importDefault(require("../controllers/parentController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.userSchema), parentController_1.default.addParent);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.userSchema), parentController_1.default.editParent);
router.put('/archive', parentController_1.default.archiveParent);
router.put('/restore', parentController_1.default.restoreParent);
exports.default = router;
