const express = require('express');
const router = express.Router();


const usuarioController = require('../controllers/usuarioController');


router.get('/', usuarioController.list);
router.get('/:id', usuarioController.getById);

module.exports = router;
