const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/',  authMiddleware.requireAuth,estadoController.list);
router.get('/:id',  authMiddleware.requireAuth,estadoController.getById);

module.exports = router;