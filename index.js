const express = require('express');
const routes = require('./route/route');

const app = express();
const bodyparser = require('body-parser');
app.use(express.json());
     
app.use('/', routes); 

const PORT = 2000; 
 
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)             
});       


