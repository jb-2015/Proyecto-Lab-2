const express = require('express');
const router = express.Router();
const cambioEstadoController = require('../controllers/cambioEstadoController');

router.get('/', cambioEstadoController.obtenerCE);

module.exports = router;