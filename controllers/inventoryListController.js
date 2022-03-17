const inventoryListModel = require("../models/inventoryListModel.js");

const getAll = (req, res) => {
  const inventoryData = inventoryListModel.getAll();

  const strippedData = inventoryData.map((inventory) => {
    return {
      id: inventory.id,
      warehouseID: inventory.warehouseID,
      warehouseName: inventory.warehouseName,
      itemName: inventory.itemName,
      category: inventory.category,
      status: inventory.status,
      quantity: inventory.quantity,
    };
  });

  res.json(strippedData);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundItem = inventoryListModel.getById(id);

  if (!foundItem) {
    return res.status(404).send("An item does not exist with the id of" + id);
  }

  res.json(foundItem);
};

module.exports = {
  getAll,
  getOne,
};