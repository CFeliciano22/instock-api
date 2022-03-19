const express = require('express');
const router = express.Router();
const inventoryListController = require('../controllers/inventoryListController.js');
const fs = require ('fs');
const uuid = require('uuid');

router.get('/', inventoryListController.getAll);
router.get('/:id', inventoryListController.getOne);
// router.post('/add', inventoryListController.postOne);


router.post("/", (req, res) => {
    
    //InventoryItemID generator 
    let itemID = uuid.v4();

    //ListModel stuff
	const inventoryList = fs.readFileSync("./data/inventories.json");
	let inventoryData = JSON.parse(inventoryList);

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
			// warehouseName: req.body.warehouseName, // needed?
			itemName: req.body.itemName,
			description: req.body.description,
			// category: req.body.category,
			// status: req.body.status,
			// quantity: req.body.quantity
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

		res.status(201).send(newItem); //CHANGE THIS TO INVENTORYDATA !
	}
});


module.exports = router;