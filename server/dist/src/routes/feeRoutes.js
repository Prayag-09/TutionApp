"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feeController_1 = __importDefault(require("../controllers/feeController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.feeSchema), feeController_1.default.addFee);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.feeSchema), feeController_1.default.editFee);
router.put('/archive', feeController_1.default.archiveFee);
router.put('/restore', feeController_1.default.restoreFee);
exports.default = router;
