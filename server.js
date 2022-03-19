const express = require('express')
const cors = require('cors');

const inventoryRoute = require ('./routes/inventoryListRoute.js')
const warehouseRoute = require ('./routes/warehouseListRoute.js')

const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());


app.use('/inventories', inventoryRoute);
app.use('/warehouses', warehouseRoute);


const SERVER_PORT= process.env.PORT || 8000;

app.listen(SERVER_PORT,()=>{
console.log(`server is listening on ${SERVER_PORT}`)
});