const express = require('express');
const router = express.Router();
const AssignmentController = require('../controllers/assignmentController');

router.post('/add', AssignmentController.addAssignment);
router.put('/edit', AssignmentController.editAssignment);
router.put('/archive', AssignmentController.archiveAssignment);
router.put('/restore', AssignmentController.restoreAssignment);

module.exports = router;
