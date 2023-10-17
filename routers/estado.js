const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

router.get('/', estadoController.list);
router.get('/:id', estadoController.getById);

module.exports = router;