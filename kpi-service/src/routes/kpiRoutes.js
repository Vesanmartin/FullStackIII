// src/routes/kpiRoutes.js

const express = require('express');
const router  = express.Router();
const { calcular, obtenerTipos } = require('../controllers/kpiController');

/**
 * @swagger
 * /api/kpis/health:
 *   get:
 *     summary: Verifica que el servicio está vivo
 *     responses:
 *       200:
 *         description: Servicio funcionando OK
 */
router.get('/health', (req, res) => {
  res.json({
    servicio:  'Probando el Micro servicio kpi-service - Grupo Cordillera',
    estado:    'Pulentooo XD',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /api/kpis/tipos:
 *   get:
 *     summary: Obtiene los tipos de KPI disponibles
 *     responses:
 *       200:
 *         description: Lista de tipos disponibles (ventas, inventario, rentabilidad)
 */
router.get('/tipos', obtenerTipos);

/**
 * @swagger
 * /api/kpis/calculate/{type}:
 *   post:
 *     summary: Calcula un KPI según el tipo
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Tipo de KPI (ventas, inventario, rentabilidad)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                 example:
 *                   - amount: 150000
 *                   - amount: 230000
 *     responses:
 *       200:
 *         description: KPI calculado correctamente
 *       400:
 *         description: Tipo de KPI no existe
 *       500:
 *         description: Error interno del servidor
 */
router.post('/calculate/:type', calcular);

module.exports = router;