// src/routes/informeRoutes.js

const express    = require('express');
const router     = express.Router();
const {
  getDashboard,
  getEstadoCircuitos
} = require('../controllers/informeController');

/**
 * @swagger
 * /api/informes/health:
 *   get:
 *     summary: Verifica que el servicio está vivo
 *     responses:
 *       200:
 *         description: Servicio funcionando OK
 */
router.get('/health', (req, res) => {
  res.json({
    servicio:  'pro ando el microservicio de informes-service',
    estado:    'Seeeeeeeeeeeeeee',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /api/informes/dashboard:
 *   get:
 *     summary: Genera el dashboard ejecutivo completo
 *     description: Llama a kpi-service y gestion-service protegido por Circuit Breaker
 *     responses:
 *       200:
 *         description: Dashboard generado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/dashboard', getDashboard);

/**
 * @swagger
 * /api/informes/circuitos:
 *   get:
 *     summary: Muestra el estado de los Circuit Breakers
 *     description: Retorna el estado CLOSED, OPEN o HALF_OPEN de cada circuito
 *     responses:
 *       200:
 *         description: Estado de los circuitos
 */
router.get('/circuitos', getEstadoCircuitos);

module.exports = router;