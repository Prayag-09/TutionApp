const express = require('express');
const router = express.Router();

const GradeController = require('../controllers/gradeController');

router.post('/add', GradeController.addGrade);
router.put('/edit', GradeController.editGrade);
router.put('/archive', GradeController.archiveGrade);
router.put('/restore', GradeController.restoreGrade);

module.exports = router;
