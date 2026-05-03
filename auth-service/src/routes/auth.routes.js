import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { Router } from "express";
import db from "../db.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la BD" });
  }
});

export default router;
