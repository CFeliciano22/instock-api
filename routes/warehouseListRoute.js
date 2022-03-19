const express = require('express');
const router = express.Router();
const warehouseListController = require('../controllers/warehouseListController.js');
const fs = require ('fs');
const uuid = require('uuid');

router.get('/', warehouseListController.getAll);
router.get('/:id', warehouseListController.getOne);
// router.post('/',warehouseListController.postOne);


router.post('/', (req,res) => {

    //ListModel stuff
    const warehouseList = fs.readFileSync("./data/warehouses.json")
    let warehouseData = JSON.parse(warehouseList);

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
    
        res.status(201).json(newWarehouse); //Change to warehouseData later !!!
        }
});

module.exports = router;