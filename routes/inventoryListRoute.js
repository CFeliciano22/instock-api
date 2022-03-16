const express = require('express');
const router = express.Router();
const inventoryListController = require('../controllers/inventoryListController.js');

router.get('/', inventoryListController.getAll);

module.export = router;