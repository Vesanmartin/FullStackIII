// auth-service/src/routes/auth.routes.js
import express from 'express';
import { register, login, verifyCode } from '../controllers/auth.controller.js';
import conexion from '../db.js';
import { ContextoPermisos } from '../strategies/rolStrategy.js';

const router = express.Router();

// Roles válidos del sistema
const rolesValidos = ['admin', 'gerente', 'operador', 'supersaiyajin'];

// Registro
router.post('/register', register);

// Login + 2FA
router.post('/login', login);
router.post('/verify-code', verifyCode);

// Obtener todos los usuarios
router.get('/users', (req, res) => {
  conexion.query('SELECT * FROM usuarios', (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la BD' });
    res.json(resultados);
  });
});

// Permisos por rol — Patrón Strategy
// Uso: GET /api/auth/permisos?rol=admin
router.get('/permisos', (req, res) => {
  const { rol } = req.query;
  if (!rol) return res.status(400).json({ error: 'Falta parametro rol' });
  const contexto = new ContextoPermisos(rol);
  res.json(contexto.getPermisos());
});

// Actualizar rol de usuario
// Uso: PUT /api/auth/usuarios/:id/rol
router.put('/usuarios/:id/rol', (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

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

// Eliminar usuario
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