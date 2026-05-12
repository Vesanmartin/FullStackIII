// src/routes/importRoutes.js

const express   = require('express');
const enrutador = express.Router();
const {
  importarCSV, subirArchivo,
  importarDatos, listarModulos,
  getHistorial, health
} = require('../controllers/importController');

// Flujo 1 — importación automática simulada
enrutador.post('/datos',    importarDatos);

// Flujo 2 — importación manual CSV real
enrutador.post('/csv',      subirArchivo, importarCSV);

// Utilidades
enrutador.get('/modulos',   listarModulos);
enrutador.get('/historial', getHistorial);
enrutador.get('/health',    health);

module.exports = enrutador;