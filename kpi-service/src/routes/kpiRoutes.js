// src/routes/kpiRoutes.js

const express = require('express');
const router  = express.Router();
const { calcular, obtenerTipos } = require('../controllers/kpiController');

// GET http://localhost:3002/api/kpis/health
router.get('/health', (req, res) => {
  res.json({
    servicio:  'Probando el Micro servicio kpi-service - Grupo Cordillera',
    estado:    'Pulentooo XD',
    timestamp: new Date().toISOString()
  });
});

// GET http://localhost:3002/api/kpis/tipos
router.get('/tipos', obtenerTipos);

// POST http://localhost:3002/api/kpis/calculate/sales
// POST http://localhost:3002/api/kpis/calculate/inventory
// POST http://localhost:3002/api/kpis/calculate/profitability
router.post('/calculate/:type', calcular);

module.exports = router;