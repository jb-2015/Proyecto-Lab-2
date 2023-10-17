const express = require('express');
const router = express.Router();


const personaController = require('../controllers/personaController');


router.get('/', personaController.list);
router.get('/update/:id', personaController.update);
router.get('/create', personaController.create);
router.get('/remove/:id', personaController.remove);
router.get('/id/:id', personaController.findById);
router.get('/nombre/:nombre', personaController.findByNombre);
router.get('/dni/:dni', personaController.findByDni);
router.get('/apellido/:apellido', personaController.findByApellido);
router.get('/email/:email', personaController.findByEmail);
router.get('/cantidad', personaController.obtenerCantidadTotal);
router.get('/per', personaController.obtenerDatosPersonasConOrdenes);

router.get('/tabla', personaController.tabla);
module.exports = router;
