const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/parentController');

router.post('/add', ParentController.addParent);
router.put('/edit', ParentController.editParent);
router.put('/archive', ParentController.archiveParent);
router.put('/restore', ParentController.restoreParent);

module.exports = router;
