const express = require('express');
const router = express.Router();


const valorRefController = require('../controllers/valorRefController');

router.get('/', valorRefController.list);
router.get('/:id', valorRefController.getById);

module.exports = router;