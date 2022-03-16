const filePath = './data/inventories.json';

function readInventories() {
    const inventoryFile = fs.readFileSync(filePath);
    const inventoryData = JSON.parse(inventoryFile);
    return inventoryData;
}

const getAll = () => {
    return readInventories();
};

module.export = getAll;