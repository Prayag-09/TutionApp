const express = require('express');
const router = express.Router();

const TeacherController = require('../controllers/teacherController');

router.post('/add', TeacherController.addTeacher);
router.put('/edit', TeacherController.editTeacher);
router.put('/archive', TeacherController.archiveTeacher);
router.put('/restore', TeacherController.restoreTeacher);

module.exports = router;
