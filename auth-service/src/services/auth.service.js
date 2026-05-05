// auth-service/src/services/auth.service.js
// Lógica de negocio para registro e inicio de sesión
// Usa el modelo para acceder a la base de datos

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { buscarPorEmail, crearUsuario } from '../models/user.model.js';

// Registra un usuario nuevo verificando que no exista antes
export const registerUser = async (email, password) => {

  // Verificamos si el usuario ya existe en la base de datos
  const usuarioExistente = await buscarPorEmail(email);
  if (usuarioExistente) {
    throw new Error('Usuario ya existe');
  }

  // Encriptamos la contraseña antes de guardarla
  const passwordEncriptado = await bcrypt.hash(password, 10);

  // Guardamos el usuario en la base de datos
  await crearUsuario(email, passwordEncriptado);

  return { mensaje: 'Usuario registrado correctamente' };
};

// Verifica credenciales y retorna un token JWT si son correctas
export const loginUser = async (email, password) => {

  // Buscamos el usuario en la base de datos
  const usuario = await buscarPorEmail(email);
  if (!usuario) {
    throw new Error('Usuario no existe');
  }

  // Comparamos la contraseña ingresada con la encriptada
  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) {
    throw new Error('Contraseña incorrecta');
  }

  // Generamos el token JWT con duración de 1 hora
  const token = jwt.sign(
  { id: usuario.id, email: usuario.email, rol: usuario.rol },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

  return token;
};