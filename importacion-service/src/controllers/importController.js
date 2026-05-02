// src/controllers/importController.js
// Controlador que maneja las peticiones de importacion de datos

const importService = require('../services/importService');

// POST /api/import/datos
// Recibe el tipo de fuente y llama al servicio de importacion
const importarDatos = async (req, res) => {
    try {
        const { sourceType } = req.body;

        if (!sourceType) {
            return res.status(400).json({
                success: false,
                error: 'Falta el campo sourceType (ERP, CRM o POS)'
            });
        }

        const resultado = await importService.importData(sourceType);

        res.status(200).json({
            success: true,
            resultado
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// GET /api/import/health
// Verifica que el servicio esta corriendo
const health = (req, res) => {
    res.json({
        servicio: 'importacion-service',
        estado: 'ok',
        timestamp: new Date().toISOString()
    });
};

module.exports = { importarDatos, health };