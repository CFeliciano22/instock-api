const express = require("express");
const router = express.Router();
const inventoryListController = require("../controllers/inventoryListController.js");


router.get('/', inventoryListController.getAll);
router.get('/:id', inventoryListController.getOne);
router.post('/', inventoryListController.postOne);
router.patch("/:id", inventoryListController.editOne);
router.delete('/:id', inventoryListController.deleteOne);


module.exports = router;
