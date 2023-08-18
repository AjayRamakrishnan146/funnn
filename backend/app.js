const express= require('express');
const app = new express();
const morgan = require('morgan');
app.use(morgan('dev'));
require('dotenv').config();

var cors = require('cors');
app.use(cors());

require('./db/employeeDtata');

const api= require('./routes/employeeRoute');
app.use('/api',api);




PORT= 5000;
app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`)
})
