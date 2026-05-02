const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // tu contraseña
    database: 'importacion_db'
});

module.exports = pool;