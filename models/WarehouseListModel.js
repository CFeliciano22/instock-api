const filePath = './data/warehouses.json';
const fs = require ('fs')

function readWarehouses() {
    const warehouseFile = fs.readFileSync(filePath);
    const warehouseData = JSON.parse(warehouseFile);
    return warehouseData;
}

const getAll = () => {
    return readWarehouses();
};

const getById = (id) => {
    const warehouseData = readWarehouses();
    return warehouseData.find((warehouse) => 
    id === warehouse.id);
};

function writeWarehouses(data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
};

module.exports = 
{
getAll,
getById,
writeWarehouses
}
