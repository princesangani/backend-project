 const mysql = require('mysql2/promise');
const dotenv = require('dotenv')

dotenv.config();

const db = mysql.createPool({
  
  host: 'localhost',
  user: 'root',
  password: '56135511',                                                                   
  database: 'express',
});
 
module.exports = db; 