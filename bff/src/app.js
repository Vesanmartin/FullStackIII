// src/app.js


// BFF — Backend For Frontend

// Capa intermedia entre el frontend React y el API Gateway.
// Agrega múltiples llamadas en una sola respuesta.
// Adapta el formato de los datos para el frontend.


require('dotenv').config();

const express    = require('express');
const bffRoutes  = require('./routes/bffRoutes');

const aplicacion = express();
const PUERTO     = process.env.PORT || 3005;

// Permite leer JSON en el body
aplicacion.use(express.json());

// Todas las rutas del BFF quedan bajo /bff
aplicacion.use('/bff', bffRoutes);

// Ruta no encontrada
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