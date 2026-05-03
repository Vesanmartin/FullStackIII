// auth-service/src/routes/auth.routes.js
// Define las rutas del servicio de autenticación

import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import conexion from '../db.js';

const router = express.Router();

// Ruta para registrar un usuario nuevo
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener todos los usuarios (útil para pruebas)
router.get('/users', (req, res) => {
  conexion.query('SELECT * FROM usuarios', (err, resultados) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }
    res.json(resultados);
  });
});

export default router;
