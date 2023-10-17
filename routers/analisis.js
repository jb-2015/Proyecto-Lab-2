
const express = require('express');
const router = express.Router();
const analisisController = require('../controllers/analisisController');

router.get('/', analisisController.obtenerAnalisis);

module.exports = router;
