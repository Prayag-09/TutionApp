const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

router.post('/add', QuizController.addQuiz);
router.put('/edit', QuizController.editQuiz);
router.put('/archive', QuizController.archiveQuiz);
router.put('/restore', QuizController.restoreQuiz);

module.exports = router;
