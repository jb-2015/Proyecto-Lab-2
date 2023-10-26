const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.list);
router.get('/:id', pedidoController.getById);
router.post('/creaPedido', pedidoController.crearPedido);



module.exports = router;