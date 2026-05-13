// auth-service/src/controllers/auth.controller.js
import { registerUser, loginUser } from "../services/auth.service.js";

// Almacén temporal por usuario (en producción sería Redis)
const sesionesTemporales = new Map();

// REGISTRO
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await registerUser(email, password);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// LOGIN + 2FA
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar usuario y obtener token
    const token = await loginUser(email, password);

    // Generar código 6 dígitos
    const codigoTemporal = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Guardar token + código juntos por email
    sesionesTemporales.set(email, { token, codigoTemporal });

    console.log(`Código 2FA para ${email}:`, codigoTemporal);

    return res.status(200).json({
      success: true,
      twoFactor: true,
      message: "Código enviado a su correo"
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
};

// VERIFICAR CÓDIGO 2FA
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Buscar sesión temporal del usuario
    const sesion = sesionesTemporales.get(email);

    if (!sesion) {
      return res.status(401).json({
        success: false,
        message: "No hay sesión pendiente para este usuario"
      });
    }

    if (code === sesion.codigoTemporal) {
      // Limpiar sesión temporal
      sesionesTemporales.delete(email);

      // Enviar el JWT
      return res.status(200).json({
        success: true,
        token: sesion.token,
        message: "Autenticación correcta"
      });
    }

    return res.status(401).json({
      success: false,
      message: "Código incorrecto"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};