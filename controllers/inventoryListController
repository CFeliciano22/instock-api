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

module.exports = getAll;