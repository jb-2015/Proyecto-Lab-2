const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examenController');

router.get('/', examenController.list);
router.get('/:id', examenController.getById);
router.post('/examenes', examenController.ingresarExamen);
router.put('/examenes/:id', examenController.actualizarExamen);
router.put('/examenes/:id/cambiar-datos', examenController.cambiarDatosExamen);
router.put('/examenes/:id/activar-desactivar', examenController.activarDesactivarExamen);
module.exports = router;