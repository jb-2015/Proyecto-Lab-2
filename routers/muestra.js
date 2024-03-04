const express = require('express');
const router = express.Router();

const guiaController= require('../controllers/guiaMuestraController')

const muestraController = require('../controllers/muestraController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/',authMiddleware.requireAuth, muestraController.list);
router.get('/:id',authMiddleware.requireAuth, muestraController.getById);
router.get('/obtenerMuestras/:id',authMiddleware.requireAuth, guiaController.buscarPorAnalisis)
router.put('/update/:id',authMiddleware.requireAuth, muestraController.updateMuestra);
router.delete('/delet/:id', muestraController.deleteByIdMuestra);
module.exports = router;
