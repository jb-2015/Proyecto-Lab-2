const express = require('express');
const router = express.Router();


const valorRefController = require('../controllers/valorRefController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/',authMiddleware.requireAuth, valorRefController.list);
router.get('/:id', authMiddleware.requireAuth, valorRefController.getById);

module.exports = router;