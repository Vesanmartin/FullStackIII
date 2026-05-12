// informes-service/src/config/database.js
// Conexión a MySQL para el servicio de informes

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
    console.error('Error de conexión Informes:', err);
    return;
  }
  console.log('Informes service conectado a MySQL');
});

module.exports = conexion;