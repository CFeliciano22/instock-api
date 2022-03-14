const express = require('express');
require('dotenv').config();
const cors = require('cors');


const app = express();


const SERVER_PORT= process.env.PORT || 8000;

app.listen(SERVER_PORT,()=>{
console.log(`server is listening on ${SERVER_PORT}`)
});
