const express = require('express');
const router = express.Router();
const inventoryListController = require('../controllers/inventoryListController.js');


router.get('/', inventoryListController.getAll);
router.get('/:id', inventoryListController.getOne);
router.post('/', inventoryListController.postOne);

module.exports = router;