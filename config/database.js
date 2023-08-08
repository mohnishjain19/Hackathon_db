
const mysql=require("mysql2");
const dotenv=require("dotenv");



dotenv.config({path:"config/config.env"});

const connectDatabase = mysql.createConnection({
    host: 'localhost', 
    database: 'hackathon_db',
    user: 'root',
    password: process.env.PASSWORD, 
  });
  

  
module.exports = connectDatabase;