// src/controllers/auth.controller.js

import { registerUser, loginUser } from "../services/auth.service.js";

let codigoTemporal = "";

// REGISTRO
export const register = async (req, res) => {

  try {

    const { nombre, email, password } = req.body;

    const result = await registerUser(
      nombre,
      email,
      password
    );

    return res.status(201).json(result);

  } catch (error) {

    return res.status(400).json({
      error: error.message
    });
  }
};

// LOGIN + 2FA
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // validar usuario en BD
    const token = await loginUser(email, password);

    // generar código 6 dígitos
    codigoTemporal = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Código generado:", codigoTemporal);

    // NO enviar token todavía
    return res.status(200).json({
      success: true,
      twoFactor: true,
      message: "El código ha sido enviado a su correo"
    });

  } catch (error) {

    return res.status(401).json({
      success: false,
      error: error.message
    });
  }
};

// VERIFICAR CÓDIGO 2FA
export const verifyCode = async (req, res) => {

  try {

    const { code } = req.body;

    if (code === codigoTemporal) {

      return res.status(200).json({
        success: true,
        message: "Autenticación correcta"
      });
    }

    return res.status(401).json({
      success: false,
      message: "Código incorrecto"
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });
  }
};

