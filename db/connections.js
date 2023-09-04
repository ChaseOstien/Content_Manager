const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log("\n"),
    console.log(`Connected to the employee_db database.`),
    console.log("\n")
);

module.exports = db;