// src/controllers/informeController.js


// CONTROLADOR — parte del patrón MVC

// Recibe el request HTTP, llama al service y devuelve respuesta.
// No tiene lógica de negocio — solo coordina.


const informeService = require('../services/informeService');
const conexion = require('../config/database');

// GET /api/informes/dashboard
const getDashboard = async (req, res) => {
  try {
    const usuarioId = req.headers['x-user-id'] || 'anonimo';
    const informe = await informeService.generarDashboard(usuarioId);

    // Guardamos el informe generado en la base de datos
    const query = 'INSERT INTO informes (titulo, contenido, usuario_id, sucursal) VALUES (?, ?, ?, ?)';
    conexion.query(
      query,
      [
        informe.titulo,
        JSON.stringify(informe.resumen),
        usuarioId,
        'general'
      ],
      (err) => {
        if (err) console.error('Error guardando informe en BD:', err.message);
      }
    );

    res.json({ success: true, informe });

  } catch (err) {
    console.error('Error generando dashboard:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/informes/historial
const getHistorial = (req, res) => {
  conexion.query('SELECT * FROM informes ORDER BY created_at DESC', (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la BD' });
    res.json(resultados);
  });
};

// GET /api/informes/circuitos
const getEstadoCircuitos = (req, res) => {
  try {
    const estado = informeService.obtenerEstadoCircuitos();
    res.json({ success: true, circuitos: estado });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/informes/datos-dashboard
// Devuelve datos reales desde MySQL para el dashboard de informes
// GET /api/informes/datos-dashboard definimos periodos
const getDatosDashboard = async (req, res) => {
  try {
    const contextoService = require('../services/contextoService');
    // Leemos los filtros desde la URL (?año=2024&mes_inicio=1&mes_fin=6)
    const { año, mes_inicio, mes_fin } = req.query;
    const datos = await contextoService.obtenerContexto({ año, mes_inicio, mes_fin });
    res.json({ success: true, datos });
  } catch (err) {
    console.error('Error obteniendo datos dashboard:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getDashboard, getEstadoCircuitos, getHistorial,getDatosDashboard };