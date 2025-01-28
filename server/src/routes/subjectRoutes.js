const express = require('express');
const router = express.Router();

const SubjectController = require('../controllers/subjectController.js');

router.post('/add', SubjectController.addSubject);
router.put('/edit', SubjectController.editSubject);
router.put('/archive', SubjectController.archiveSubject);
router.put('/restore', SubjectController.restoreSubject);

module.exports = router;
