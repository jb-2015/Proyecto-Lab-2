const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/',authMiddleware.requireAuth, pedidoController.list);
router.get('/:id',authMiddleware.requireAuth, pedidoController.getById);
router.post('/creaPedido',authMiddleware.requireAuth, pedidoController.crearPedido);
router.put('/update/:id',authMiddleware.requireAuth, pedidoController.updatePedido);


module.exports = router;