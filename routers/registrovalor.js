const express = require('express');
const router = express.Router();
const registro_valController = require('../controllers/registro_valController');
const authMiddleware = require('../middleware/authMiddleware');
router.put('/update/:id',authMiddleware.requireAuth, registro_valController.updateRg);

module.exports = router;