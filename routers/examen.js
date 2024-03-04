const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examenController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware.requireAuth,examenController.list);
router.get('/:id', authMiddleware.requireAuth,examenController.getById);
router.post('/examenes', authMiddleware.requireAuth,examenController.ingresarExamen);
router.put('/examenes/:id', authMiddleware.requireAuth,examenController.actualizarExamen);
router.put('/examenes/:id/cambiar-datos',authMiddleware.requireAuth, examenController.cambiarDatosExamen);
router.put('/examenes/:id/activar-desactivar', authMiddleware.requireAuth,examenController.activarDesactivarExamen);
router.put('/examenes/cambioEstado/ex/:id',authMiddleware.requireAuth, examenController.cambiarEstadoDeEx);
router.put('/examenes/cambioEstadoAcero/exEstadoCero/:id',authMiddleware.requireAuth, examenController.cambiarEstadoDeExACero);
router.delete('/examenes/delet/:id',authMiddleware.requireAuth, examenController.deleteById)

module.exports = router;