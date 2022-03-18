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

const deleteOne = (req, res) => {
  const { id } = req.params;
  const inventoryData = inventoryListModel.getAll();
  updatedInventoryData = inventoryData.filter((inventoryItem) => inventoryItem.id !== req.params.id);
  inventoryListModel.writeInventories(updatedInventoryData);
}

module.exports = {
  getAll,
  getOne,
  deleteOne,
};





const filePath = './data/inventories.json';
const fs = require ('fs')

function readInventories() {
    const inventoryFile = fs.readFileSync(filePath);
    const inventoryData = JSON.parse(inventoryFile);
    return inventoryData;
}

const getAll = () => {
    return readInventories();
};

const getById = (id) => {
    const inventoryData = readInventories();
    return inventoryData.find((inventory) => 
    id === inventory.id);
}

function writeInventories(data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
};

module.exports = 
{
getAll,
getById,
writeInventories
}