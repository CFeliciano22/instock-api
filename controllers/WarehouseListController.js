const warehouseListModel = require("../models/warehouseListModel.js");
const inventoryListModel = require("../models/inventoryListModel.js");
const uuid = require('uuid');
const fs = require ('fs');

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
    .filter((item) => item.warehouseID === foundWarehouse);

  res.send({
    warehouse: foundWarehouse,
    inventoryList: warehouseInventoryList,
  });
};

const postOne = (req, res) => {
  let warehouseData = warehouseListModel.getAll();

  //warehouseID generator
  let whID = uuid.v4();

  // Validation 
  let emptyCheck = 0;
  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegEx = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/
  
  Object.values(req.body).forEach(item => {
      if (item === "") {
          return emptyCheck += 1
      }
  });
  
  if (emptyCheck >= 1) {
      res.status(403).send("Empty values found");
  } else if (!emailRegEx.test(req.body.email)) {
      res.status(403).send("Incorrect email");
  } else if (!phoneRegEx.test(req.body.phone)) {
      res.status(403).send("Incorrect phone number")
  } else {
      
      let newWarehouse = {
          id: whID,
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          contact: {
              name: req.body.contact.name,
              position: req.body.contact.position,
              phone: req.body.contact.phone,
              email: req.body.contact.email
          }
      }

      //Push newWarehouse to warehouseData
      warehouseData.push(newWarehouse)

      fs.writeFile("./data/warehouses.json",JSON.stringify(warehouseData), (err) => {
          if (err) {
              console.log(err.data);
          }
          console.log('New warehouse added successfully')
      });
  
      res.status(201).json(warehouseData); 
      }
}

module.exports = {
  getAll,
  getOne,
  postOne
};