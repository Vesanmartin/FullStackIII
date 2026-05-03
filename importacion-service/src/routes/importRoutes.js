// importacion-service/src/routes/importRoutes.js
// Rutas del servicio de importación de datos

const express = require('express');
const enrutador = express.Router();
const { importarDatos, getHistorial, health } = require('../controllers/importController');

// Importar datos desde una fuente (ERP, CRM, POS)
enrutador.post('/datos', importarDatos);

// Historial de importaciones guardadas en BD
enrutador.get('/historial', getHistorial);

// Health check
enrutador.get('/health', health);

module.exports = enrutador;