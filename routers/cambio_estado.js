const express = require('express');
const router = express.Router();
const cambioEstadoController = require('../controllers/cambioEstadoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.requireAuth,cambioEstadoController.obtenerCE);
router.get('/cambiarEstado/:id_orden', authMiddleware.requireAuth,cambioEstadoController.btnVerificar);
router.get('/camEstadoValidar/:id_orden/:idE',authMiddleware.requireAuth, cambioEstadoController.btnValidar);
router.get('/camEstadoAnaOesp/:estadoOrden/:idOrden/:idExa',authMiddleware.requireAuth, cambioEstadoController.newEstadoExa);



router.delete('/delet/:id',authMiddleware.requireAuth, cambioEstadoController.eliminarCEPorId);


module.exports = router;