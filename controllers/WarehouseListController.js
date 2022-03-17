const warehouseListModel = require("../models/warehouseListModel.js");
const inventoryListModel = require("../models/inventoryListModel.js");

const getAll = (req, res) => {
  const warehouseData = warehouseListModel.getAll();

  const strippedData = warehouseData.map((warehouse) => {
    return {
      id: warehouse.id,
      name: warehouse.name,
      address: warehouse.address,
      city: warehouse.city,
      country: warehouse.category,
      contact: warehouse.contact.name,
      phone: warehouse.contact.phone,
      email: warehouse.contact.email,
    };
  });

  res.json(strippedData);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundWarehouse = warehouseListModel.getById(id);
  const warehouseInventoryList = inventoryListModel
    .getAll()
    .filter((item) => item.warehouseID === foundWarehouse.id);

  res.send({
    warehouse: foundWarehouse,
    inventoryList: warehouseInventoryList,
  });
};

module.exports = {
  getAll,
  getOne,
};