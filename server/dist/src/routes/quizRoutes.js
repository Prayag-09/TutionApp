"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizController_1 = __importDefault(require("../controllers/quizController"));
const validators_1 = require("../validators");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/add', (0, validation_1.validateRequest)(validators_1.quizSchema), quizController_1.default.addQuiz);
router.put('/edit', (0, validation_1.validateRequest)(validators_1.quizSchema), quizController_1.default.editQuiz);
router.put('/archive', quizController_1.default.archiveQuiz);
router.put('/restore', quizController_1.default.restoreQuiz);
exports.default = router;
