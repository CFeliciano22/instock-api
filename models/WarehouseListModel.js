const filePath = './data/warehouses.json';

function readWarehouses() {
    const warehouseFile = fs.readFileSync(filePath);
    const warehouseData = JSON.parse(warehouseFile);
    return warehouseData;
}

const getAll = () => {
    return readWarehouses();
};

module.export = getAll;
