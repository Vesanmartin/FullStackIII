// src/app.js
// BFF — Backend For Frontend

require('dotenv').config();

const express   = require('express');
const bffRoutes = require('./routes/bffRoutes');

const aplicacion = express();
const PUERTO     = process.env.PORT || 3005;

aplicacion.use(express.json());

aplicacion.use('/bff', bffRoutes);

aplicacion.use((req, res) => {
  res.status(404).json({
    error: `Ruta ${req.method} ${req.path} no existe`
  });
});

aplicacion.listen(PUERTO, () => {
  console.log(` BFF corriendo en http://localhost:${PUERTO}`);
  console.log(`  GET  /bff/health       : Estado del BFF`);
  console.log(`  GET  /bff/dashboard    : Dashboard completo`);
  console.log(`  POST /bff/chat         : Chatbot`);
  console.log(`  POST /bff/kpis/:tipo   : Calcular KPI`);
});