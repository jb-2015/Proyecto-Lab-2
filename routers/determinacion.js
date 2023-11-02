const express = require('express');
const router = express.Router();
const determinacionController = require('../controllers/determinacionController');

//router.get('/', determinacionController.list);
//router.get('/:id', determinacionController.getById);

router.get('/paraValidar/:id_orden/:sexo', determinacionController.obtenerResultadoExamen);
module.exports = router;