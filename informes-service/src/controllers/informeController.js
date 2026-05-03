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

module.exports = { getDashboard, getEstadoCircuitos, getHistorial };