const express = require('express');
const router = express.Router();

const guiaController= require('../controllers/guiaMuestraController')

const muestraController = require('../controllers/muestraController');

router.get('/', muestraController.list);
router.get('/:id', muestraController.getById);
router.get('/obtenerMuestras/:id',guiaController.buscarPorAnalisis)

module.exports = router;
