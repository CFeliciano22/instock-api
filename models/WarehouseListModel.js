const filePath = './data/warehouses.json';

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

module.export = 
{
getAll,
getById
}
