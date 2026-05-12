// auth-service/src/models/user.model.js
// Este archivo maneja las consultas a la tabla usuarios en MySQL
// No guarda datos en memoria, todo va a la base de datos real

import conexion from '../db.js';

// Busca un usuario por su email en la base de datos
const buscarPorEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    conexion.query(query, [email], (err, resultados) => {
      if (err) reject(err);
      else resolve(resultados[0]); // retorna el primer resultado o undefined
    });
  });
};

// Inserta un usuario nuevo en la base de datos
const crearUsuario = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
    conexion.query(query, [email, password], (err, resultado) => {
      if (err) reject(err);
      else resolve(resultado);
    });
  });
};

export { buscarPorEmail, crearUsuario };