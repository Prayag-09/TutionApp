"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = __importDefault(require("../controllers/studentController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.userSchema), studentController_1.default.addStudent);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.userSchema), studentController_1.default.editStudent);
router.put('/archive', studentController_1.default.archiveStudent);
router.put('/restore', studentController_1.default.restoreStudent);
exports.default = router;
