const express = require('express');
const router = express.Router();


const muestraController = require('../controllers/muestraController');

router.get('/', muestraController.list);
router.get('/:id', muestraController.getById);

module.exports = router;
