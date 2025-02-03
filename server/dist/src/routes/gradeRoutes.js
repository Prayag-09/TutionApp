"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gradeController_1 = __importDefault(require("../controllers/gradeController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.gradeValidator), gradeController_1.default.addGrade);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.gradeValidator), gradeController_1.default.editGrade);
router.put('/archive', gradeController_1.default.archiveGrade);
router.put('/restore', gradeController_1.default.restoreGrade);
exports.default = router;
