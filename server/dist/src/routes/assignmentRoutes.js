"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assignmentController_1 = __importDefault(require("../controllers/assignmentController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.assignmentSchema), assignmentController_1.default.addAssignment);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.assignmentSchema), assignmentController_1.default.editAssignment);
router.put('/archive', assignmentController_1.default.archiveAssignment);
router.put('/restore', assignmentController_1.default.restoreAssignment);
exports.default = router;
