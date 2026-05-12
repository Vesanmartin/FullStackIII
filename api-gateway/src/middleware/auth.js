// src/middleware/auth.js

// MIDDLEWARE: Autenticación JWT

// Este middleware verifica el token JWT en cada request.
// El API Gateway es el ÚNICO lugar que hace esta verificación.
// Los microservicios internos confían en que si llegó acá,
// el usuario ya fue validado.

require('dotenv').config();

const jwt = require('jsonwebtoken');


// Middleware principal de autenticación
const verificarToken = (req, res, next) => {

  // El token viene en el header Authorization
  
  const encabezado = req.headers['authorization'];

  if (!encabezado) {
    return res.status(401).json({
      error:  'Acceso denegado',
      detalle: 'No se encontró el header Authorization'
    });
  }

  // Separamos "Bearer" del token real
  const token = encabezado.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error:   'Formato inválido',
      detalle: 'Usa: Authorization: Bearer <token>'
    });
  }

  try {
    // Verificamos el token con la clave secreta
    const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);

    // Pasamos los datos del usuario al siguiente middleware
    // Los microservicios pueden leer estos headers
    req.headers['x-usuario-id']  = usuarioDecodificado.id;
    req.headers['x-usuario-rol'] = usuarioDecodificado.rol;
    req.usuario = usuarioDecodificado;

    next(); // continúa al siguiente middleware o ruta

  } catch (error) {
    return res.status(401).json({
      error:   'Token inválido o expirado',
      detalle: error.message
    });
  }
};


// Middleware para verificar rol específico (RBAC)
// RBAC = Role Based Access Control
// Ejemplo: requireRole('admin', 'gerente')
const verificarRol = (...roles) => {
  return (req, res, next) => {
    const rolUsuario = req.usuario?.rol;

    if (!roles.includes(rolUsuario)) {
      return res.status(403).json({
        error:   'Permisos insuficientes',
        detalle: `Para el ingreso se requiere uno de estos roles: ${roles.join(', ')}`
      });
    }
    next();
  };
};


module.exports = { verificarToken, verificarRol };