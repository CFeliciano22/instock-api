const warehosueListModel = require('../models/warehouseListModel.js');

const getAll = (req, res) => {
    const warehouseData = warehouseListModel.getAll();

    const strippedData = warehouseData.map((warehouse) => {
        
        return {
            id: warehouse.id,
            name: warehouse.name,
            address: warehouse.address,
            city: warehouse.city,
            country: warehouse.category,
            name: warehouse.contact.name,
            phone: warehouse.contact.phone,
            email: warehouse.contact.email
            
        }

    });

    res.json(strippedData);
}

module.exports = getAll;