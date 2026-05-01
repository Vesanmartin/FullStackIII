import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    await registerUser(email, password);

    res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser(email, password);

    res.json({
      token
    });

  } catch (error) {
    res.status(401).json({
      error: error.message
    });
  }
};