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

// Patrón Strategy: devuelve permisos según rol.
// Uso: GET /api/auth/permisos?rol=admin
import { ContextoPermisos } from '../strategies/rolStrategy.js';

router.get('/permisos', (req, res) => {
  const { rol } = req.query;
  if (!rol) {
    return res.status(400).json({ error: "Falta parametro rol" });
  }
  const contexto = new ContextoPermisos(rol);
  res.json(contexto.getPermisos());
});

// Endpoint para actualizar rol de usuario
// Uso: PUT /api/auth/usuarios/:id/rol
// Body: { rol: "gerente" }
router.put('/usuarios/:id/rol', (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  // Validar que el rol sea válido
  const rolesValidos = ['admin', 'gerente', 'operador','supersayayin'];
  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ error: 'Rol no válido' });
  }

  conexion.query(
    'UPDATE usuarios SET rol = ? WHERE id = ?',
    [rol, id],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: 'Error actualizando rol' });
      if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ success: true, mensaje: `Rol actualizado a ${rol}` });
    }
  );
});

// Endpoint para actualizar rol de usuario — usado desde el Panel Admin
// Uso: PUT /api/auth/usuarios/:id/rol
// ejemplo: { rol: "gerente" }
router.put('/usuarios/:id/rol', (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  // Validar que el rol sea uno de los permitidos
  const rolesValidos = ['admin', 'gerente', 'operador'];
  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ error: 'Rol no valido' });
  }

  conexion.query(
    'UPDATE usuarios SET rol = ? WHERE id = ?',
    [rol, id],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: 'Error actualizando rol' });
      if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ success: true, mensaje: `Rol actualizado a ${rol}` });
    }
  );
});

// Endpoint para eliminar usuario
// Uso: DELETE /api/auth/usuarios/:id
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  conexion.query(
    'DELETE FROM usuarios WHERE id = ?',
    [id],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: 'Error eliminando usuario' });
      if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ success: true, mensaje: 'Usuario eliminado correctamente' });
    }
  );
});



export default router;
