const warehouseListModel = require("../models/warehouseListModel.js");
const inventoryListModel = require("../models/inventoryListModel.js");
const uuid = require("uuid");

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

const editOne = (req, res) => {
  const { id } = req.params;
  const foundWarehouse = warehouseListModel.getById(id);
  foundWarehouse = {
    name: req.params.name,
    address: req.params.address,
    city: req.params.city,
    country: req.params.category,
    contact: req.params.contact.name,
    phone: req.params.contact.phone,
    email: req.params.contact.email,
    
    res.status(200).send(`The warehouse with the id ${id} was updated.`)
  };
};

const postOne = (req, res) => {
  const newID = uuid;
  const newWarehouse = {
    id: newID,
    name: req.params.name,
    address: req.params.address,
    city: req.params.city,
    country: req.params.category,
    contact: req.params.contact.name,
    phone: req.params.contact.phone,
    email: req.params.contact.email,
  };

  warehouseListModel.push(newWarehouse);
};

const deleteOne = (req, res) => {
  const warehouseData = warehouseListModel.getAll();
  updatedWarehouseData = warehouseData.filter((warehouse) => warehouse.id !== req.params.id);
  warehouseListModel.writeWarehouses(updatedWarehouseData);
  
  const inventoryData = inventoryListModel.getAll();
  updatedInventoryData = inventoryData.filter((inventoryList) => inventoryList.warehouseID !== req.params.id);
  inventoryListModel.writeInventories(updatedInventoryData);

  res.status(200).send(`The warehouse with the id ${req.params.id} was deleted.`)
}


module.exports = {
  getAll,
  getOne,
  editOne, 
  postOne,
  deleteOne
};
