// importacion-service/src/controllers/importController.js
// Controlador que maneja las peticiones de importación de datos

const importService = require('../services/importService');
const conexion = require('../services/db');

// POST /api/import/datos
// Recibe el tipo de fuente, importa y guarda registro en BD
const importarDatos = async (req, res) => {
  try {
    const { sourceType, sucursal } = req.body;

    if (!sourceType) {
      return res.status(400).json({
        success: false,
        error: 'Falta el campo sourceType (ERP, CRM o POS)'
      });
    }

    const resultado = await importService.importData(sourceType);

    // Guardamos el registro de importación en la base de datos
    const query = 'INSERT INTO importaciones (fuente, sucursal, registros, estado) VALUES (?, ?, ?, ?)';
    conexion.query(
      query,
      [sourceType, sucursal || 'general', resultado.totalRegistros || 0, 'completado'],
      (err) => {
        if (err) console.error('Error guardando importacion en BD:', err.message);
      }
    );

    res.status(200).json({ success: true, resultado });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/import/historial
// Retorna todas las importaciones registradas en BD
const getHistorial = (req, res) => {
  conexion.query('SELECT * FROM importaciones ORDER BY created_at DESC', (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la BD' });
    res.json(resultados);
  });
};

// GET /api/import/health
const health = (req, res) => {
  res.json({
    servicio: 'importacion-service',
    estado: 'ok',
    timestamp: new Date().toISOString()
  });
};

module.exports = { importarDatos, getHistorial, health };