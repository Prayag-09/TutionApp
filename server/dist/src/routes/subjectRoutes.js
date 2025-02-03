"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectController_1 = __importDefault(require("../controllers/subjectController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.subjectValidator), subjectController_1.default.addSubject);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.subjectValidator), subjectController_1.default.editSubject);
router.put('/archive', subjectController_1.default.archiveSubject);
router.put('/restore', subjectController_1.default.restoreSubject);
exports.default = router;
