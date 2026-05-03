import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/auth", authRoutes);

// ruta de prueba
app.get("/", (req, res) => {
  res.send("Auth service funcionando");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth service corriendo en puerto ${PORT}`);
});