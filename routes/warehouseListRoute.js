const express = require('express');
const router = express.Router();
const warehouseListController = require('../controllers/warehouseListController.js');

router.get('/', warehouseListController.getAll);

module.export = router;