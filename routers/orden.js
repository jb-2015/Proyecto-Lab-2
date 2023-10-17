const express = require('express');
const router = express.Router();


const ordenController = require('../controllers/ordenController');


router.get('/', ordenController.list);
router.get('/ordenB/:id', ordenController.getById);
router.get('/orden/:id', ordenController.obtenerDatosOrdenes);
router.get('/ordenUnica/:id', ordenController.buscarPorId);


router.post('/ordenes', async (req, res) => {
  try {
    const { id_pedido, id_analisis, estado, fecha_creacion } = req.body;

    const ordenCreada = await ordenController.crearOrden(id_pedido, id_analisis, estado, fecha_creacion);

    res.json({ mensaje: 'Orden creada exitosamente', orden: ordenCreada });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
});



module.exports = router;
