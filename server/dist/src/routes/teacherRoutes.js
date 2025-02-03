"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherController_1 = __importDefault(require("../controllers/teacherController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.userSchema), teacherController_1.default.addTeacher);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.userSchema), teacherController_1.default.editTeacher);
router.put('/archive', teacherController_1.default.archiveTeacher);
router.put('/restore', teacherController_1.default.restoreTeacher);
exports.default = router;
