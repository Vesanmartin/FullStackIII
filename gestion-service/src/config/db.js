//src/config/db.js

//Acá usamos createPool para manejar múltiples conexiones a la base de datos de manera eficiente.

const mysql=require('mysql2');

const conexion=mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'Nenas.2120',
    database:'grupocordillera',
    waitForConnections: true,
    connectionLimit: 10,

});

module.exports=conexion.promise();