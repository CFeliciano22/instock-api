const inventoryListModel = require("../models/inventoryListModel.js");
const fs = require ('fs');
const uuid = require('uuid');

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

const postOne = (req, res) => {
  //InventoryItemID generator 
  let itemID = uuid.v4();

  //ListModel stuff
  const inventoryData = inventoryListModel.getAll();

    //Validation 
  let emptyCheck = 0;

  Object.values(req.body).forEach((item) => {
    if (item === "") {
      return (emptyCheck += 1);
    }
  });

  if (emptyCheck >= 1) {
    res.status(403).send("Empty values found");
  } else if (req.body.quantity < 0) {
    res.status(403).send("Quantity must greater than 0");
  } else {
    let warehouseList = fs.readFileSync("./data/warehouses.json");
    let warehouseObj = JSON.parse(warehouseList);
        
    let whID = warehouseObj.filter(
      (warehouse) => warehouse.name === req.body.warehouseName
    )[0].id;

    let newItem = {
      id: itemID,
      warehouseID: whID,
      warehouseName: req.body.warehouseName, 
      itemName: req.body.itemName,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity
    };

    //Push new InventoryItem to inventoryData
    inventoryData.push(newItem);

    fs.writeFile("./data/inventories.json",JSON.stringify(inventoryData),(err) => {
        if (err) {
          console.log(err);
        }
        console.log("new item added");
    }
  );
}
}

res.status(201).send(inventoryData); 

module.exports = {
  getAll,
  getOne,
  postOne
};