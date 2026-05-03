//auth-service/src/db.js

// Importamos mysql2 para conectarnos a la base de datos
import mysql from 'mysql2';

// Importamos dotenv para leer las variables del archivo .env
import dotenv from 'dotenv';

// Cargamos las variables de entorno (esto lee el .env)
dotenv.config();

// Creamos la conexión usando las variables de entorno
// así no dejamos contraseñas escritas directo en el código
const conexion = mysql.createConnection({
  host:     process.env.DB_HOST,      // servidor de la base de datos
  user:     process.env.DB_USER,      // usuario de mysql
  password: process.env.DB_PASSWORD,  // contraseña de mysql
  database: process.env.DB_NAME       // nombre de la base de datos
});

// Intentamos conectar y mostramos si hay error o éxito
conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Exportamos la conexión para usarla en otros archivos
export default conexion;