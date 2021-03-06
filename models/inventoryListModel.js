const filePath = './data/inventories.json';
const fs = require ('fs')

function readInventories() {
    const inventoryFile = fs.readFileSync(filePath);
    const inventoryData = JSON.parse(inventoryFile);
    return inventoryData;
}

const getAll = () => {
    return readInventories();
};

const getById = (id) => {
    const inventoryData = readInventories();
    return inventoryData.find((inventory) => 
    id === inventory.id);
};

function writeInventories(data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
};

module.exports = 
{
getAll,
getById,
writeInventories
}