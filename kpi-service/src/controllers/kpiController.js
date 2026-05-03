// kpi-service/src/controllers/kpiController.js
// Controlador: recibe el request HTTP, llama al patrón correcto y devuelve respuesta.
// Coordina, no tiene lógica del negocio.

const FabricaKPI = require('../patterns/kpiFactory');
const conexion = require('../config/database');

// POST /api/kpis/calculate/:type
const calcular = async (req, res) => {
  try {
    const { type } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        error: 'Falta campo "data" en el body'
      });
    }

    // Factory method: fabrica el calculador según el tipo
    const calculador = FabricaKPI.crear(type);
    const resultado = calculador.calculate(data);

    // Guardamos el resultado en la base de datos
    const query = 'INSERT INTO kpi_resultados (tipo, sucursal, resultado, periodo) VALUES (?, ?, ?, ?)';
    conexion.query(
      query,
      [type, data.sucursal || 'general', JSON.stringify(resultado), data.periodo || null],
      (err) => {
        if (err) console.error('Error guardando KPI en BD:', err.message);
      }
    );

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      kpi: resultado
    });

  } catch (err) {
    const status = err.message.includes('no existe') ? 400 : 500;
    res.status(status).json({ success: false, error: err.message });
  }
};

// GET /api/kpis/tipos
const obtenerTipos = (req, res) => {
  res.json({
    tipos: FabricaKPI.getTiposDisponibles()
  });
};

// GET /api/kpis/historial
// Retorna todos los KPIs calculados guardados en BD
const getHistorial = (req, res) => {
  conexion.query('SELECT * FROM kpi_resultados ORDER BY created_at DESC', (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la BD' });
    res.json(resultados);
  });
};

module.exports = { calcular, obtenerTipos, getHistorial };