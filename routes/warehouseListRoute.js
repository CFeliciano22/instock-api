const express = require('express');
const router = express.Router();
const warehouseListController = require('../controllers/warehouseListController.js');

router.get('/', warehouseListController.getAll);
router.get('/:id', warehouseListController.getOne);

module.exports = router;