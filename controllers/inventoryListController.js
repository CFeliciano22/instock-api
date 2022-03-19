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

const editOne = (req, res) => {
  const { id } = req.params;
  const foundItem = inventoryListModel.getById(id);
  foundItem = {
    itemName: req.params.itemName,
    description: req.params.description,
    category: req.params.category,
    status: req.params.status,
    warehouseName: req.params.warehouseName,
    
    res.status(200).send(`The item with the id ${id} was updated.`)
  };
};

const deleteOne = (req, res) => {
  const inventoryData = inventoryListModel.getAll();
  updatedInventoryData = inventoryData.filter((inventoryItem) => inventoryItem.id !== req.params.id);
  inventoryListModel.writeInventories(updatedInventoryData);

  res.status(200).send(`The item with the id ${req.params.id} was deleted.`)
}

module.exports = {
  getAll,
  getOne,
  editOne,
  deleteOne,
};

