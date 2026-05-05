// src/routes/kpiRoutes.js

const express = require('express');
const router  = express.Router();
const { calcular, obtenerTipos, getHistorial } = require('../controllers/kpiController');
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
// GET /api/kpis/historial - Retorna KPIs guardados en BD
router.get('/historial', getHistorial);


// GET /api/kpis/dashboard
// Calcula KPIs reales desde transacciones_erp usando Factory Method
// Este endpoint es el que consume el Dashboard del frontend
router.get('/dashboard', (req, res) => {
  const conexion = require('../config/database');
  const FabricaKPI = require('../patterns/kpiFactory');

  // Consulta 1 — datos para KPI de ventas
  const queryVentas = 'SELECT total as amount, sucursal FROM transacciones_erp';

  // Consulta 2 — datos para KPI de rentabilidad
  const queryRentabilidad = 'SELECT subtotal as revenue, iva as cost, sucursal FROM transacciones_erp';

  // Consulta 3 — ventas por año para tendencias
  const queryTendencias = 'SELECT año_importacion as periodo, SUM(total) as ventas FROM transacciones_erp GROUP BY año_importacion ORDER BY año_importacion ASC';

  // Consulta 4 — top categorias
  const queryCategorias = 'SELECT categoria, COUNT(*) as cantidad, SUM(total) as total FROM transacciones_erp GROUP BY categoria ORDER BY total DESC LIMIT 5';

  // Ejecutamos todas las consultas en paralelo
  conexion.query(queryVentas, (err, dataVentas) => {
    if (err) return res.status(500).json({ error: err.message });

    conexion.query(queryRentabilidad, (err, dataRentabilidad) => {
      if (err) return res.status(500).json({ error: err.message });

      conexion.query(queryTendencias, (err, dataTendencias) => {
        if (err) return res.status(500).json({ error: err.message });

        conexion.query(queryCategorias, (err, dataCategorias) => {
          if (err) return res.status(500).json({ error: err.message });

          try {
            // Usamos Factory Method para calcular cada KPI
            const kpiVentas = FabricaKPI.crear('ventas').calculate(dataVentas.map(d => ({ amount: parseFloat(d.amount) || 0, sucursal: d.sucursal }))
);
            const kpiRentabilidad = FabricaKPI.crear('rentabilidad').calculate(dataRentabilidad.map(d => ({ revenue: parseFloat(d.revenue) || 0, cost: parseFloat(d.cost) || 0 }))
);
            const kpiTendencias   = dataTendencias.length > 1
              ? FabricaKPI.crear('tendencias').calculate(dataTendencias.map(d => ({
                  periodo: String(d.periodo),
                  ventas:  parseFloat(d.ventas)
                })))
              : null;

            res.json({
              success: true,
              ventas:       kpiVentas,
              rentabilidad: kpiRentabilidad,
              tendencias:   kpiTendencias,
              categorias:   dataCategorias,
              totalRegistros: dataVentas.length
            });

          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        });
      });
    });
  });
});



module.exports = router;