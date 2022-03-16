const inventoryListModel = require('../models/inventoryListModel.js');

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
            quantity: inventory.status
        }

    });

    res.json(strippedData);
}

const getOne = (req, res) => {
    const { id } = req.params;
    const foundWarehouse = warehouseModel.getById(id);
    const inventories = items.filter((item)=> item.warehouseID === req.params.itemid)

    if(!foundWarehouse) {
        return res.status(404).send('A warehouse does not exist with the id of' + id);
    }

    res.json(foundWarehouse);
    res.json(foundWarehouse);
    res.json(inventories);
};

module.exports = 
{
getAll,
getOne
};