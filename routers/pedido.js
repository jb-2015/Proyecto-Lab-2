const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.list);
router.get('/:id', pedidoController.getById);
router.post('/creaPedido/:id/:diagnostico/:nombre_medico/:nro_matricula/:id_analisis/:fechacreacion', pedidoController.crearPedido);



module.exports = router;