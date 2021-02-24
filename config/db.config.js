require('dotenv').config();
const mysql = require('mysql2/promise');

module.exports = (async () => {
    var connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.OWNER,
        password: process.env.PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\``)
    console.log("DATABASE IS READY");
});