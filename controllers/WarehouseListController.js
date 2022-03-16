const warehouseListModel = require('../models/warehouseListModel.js');

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

const getOne = (req, res) => {
    const { id } = req.params;
    const foundWarehouse = warehouseModel.getById(id);

    if(!foundWarehouse) {
        return res.status(404).send('A warehouse does not exist with the id of' + id);
    }

    res.json(foundWarehouse);
};

module.exports = 
{
getAll,
getOne
};