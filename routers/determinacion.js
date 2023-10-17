const express = require('express');
const router = express.Router();
const determinacionController = require('../controllers/determinacionController');

router.get('/', determinacionController.list);
router.get('/:id', determinacionController.getById);

module.exports = router;