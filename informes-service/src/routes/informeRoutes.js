// src/routes/informeRoutes.js

const express    = require('express');
const router     = express.Router();
const {
  getDashboard,
  getEstadoCircuitos,
  getHistorial,
  getDatosDashboard
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

// GET /api/informes/historial - Retorna informes guardados en BD
router.get('/historial', getHistorial);



//
/**
 * @swagger
 * /api/informes/publicar-evento:
 *   post:
 *     summary: Publica un evento de prueba en RabbitMQ
 *     description: Simula que informes-service notifica a kpi-service datos nuevos
 *     responses:
 *       200:
 *         description: Evento publicado en cola datos.importados
 */
router.post('/publicar-evento', async (req, res) => {
  try {
    const { publicarDatosImportados } = require('../events/publicador');
    await publicarDatosImportados({
      sucursal:  'Santiago Centro',
      tipo:      'ventas',
      periodo:   '2026-05',
      registros: 150
    });
    res.json({ 
      mensaje:  'Ejemplo de un Evento publicado en cola datos.importados',
      cola:     'datos.importados',
      receptor: 'kpi-service'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/informes/datos-dashboard:
 *   get:
 *     summary: Devuelve datos reales desde MySQL para graficar
 *     description: Consulta ventas ERP, top productos, sucursales y POS
 *     responses:
 *       200:
 *         description: Datos listos para el dashboard de informes
 */
router.get('/datos-dashboard', getDatosDashboard);



module.exports = router;