const mysql = require('mysql2');

const conexion = mysql.createPool({
    host:     process.env.DB_HOST || 'localhost',
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Nenas.2120',
    database: process.env.DB_NAME || 'grupocordillera',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = conexion.promise();