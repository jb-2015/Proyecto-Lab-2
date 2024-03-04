const express = require('express');
const router = express.Router();


const ordenController = require('../controllers/ordenController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',authMiddleware.requireAuth, ordenController.list);
router.get('/ordenB/:id',authMiddleware.requireAuth, ordenController.getById);
router.get('/orden/:id',authMiddleware.requireAuth, ordenController.obtenerDatosOrdenes);
router.get('/orden-id/:id/:rol', ordenController.listarPorID)
router.get('/orden-idPreInfo/:id/:rol',authMiddleware.requireAuth, ordenController.listarPorIDpreInfo); //
router.get('/actualizarOrden-id/:id/:rol',authMiddleware.requireAuth, ordenController.actualizarOrden)
//router.get('/orden-id/:id/:rol', ordenController.listarPorID) chekear xq tiene rol
router.get('/ordenUnica/:id', authMiddleware.requireAuth, ordenController.buscarPorId);
router.get('/ordBB', authMiddleware.requireAuth, ordenController.buscarParaValidar);
router.put('/cancelarOrden/:idOrden/:estado', ordenController.cancelarOrden);
router.post('/ordenExa/crearOrden',authMiddleware.requireAuth, async (req, res) => {
  try {
  const {idPedido,fechacreacion,fechaEntrega,valorPrioridad,estadoOrden, analisisMuestras } = req.body;

  const ordenCreada = await ordenController.crearOrden(idPedido, null, null,null,null,estadoOrden,analisisMuestras);

  const ordenPrioridad= await ordenController.cambioPrioridad(idPedido,fechacreacion,fechaEntrega,valorPrioridad)
  res.json({ mensaje: 'Orden creada exitosamente', orden: ordenCreada, ordenPrioridad: ordenPrioridad});
} catch (error) {
  console.error('Error al crear la orden:', error);
  res.status(500).json({ error: 'Error al crear la orden' });
}
});


router.post('/ordenes',authMiddleware.requireAuth, async (req, res) => {
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
