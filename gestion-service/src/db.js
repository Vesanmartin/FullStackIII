// gestion-service/src/db.js
// Conexión a MySQL para el servicio de gestión

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const conexion = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Gestion service conectado a MySQL');
});

module.exports = conexion;