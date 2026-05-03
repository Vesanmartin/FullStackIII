import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../models/user.model.js";

export const registerUser = async (email, password) => {
  const existing = users.find(u => u.email === email);
  if (existing) {
    throw new Error("Usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword
  };

  users.push(newUser);

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error("Usuario no existe");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;

  docker -v
};