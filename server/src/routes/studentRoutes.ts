const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

router.post('/add', StudentController.addStudent);
router.put('/edit', StudentController.editStudent);
router.put('/archive', StudentController.archiveStudent);
router.put('/restore', StudentController.restoreStudent);

module.exports = router;
