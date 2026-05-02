// src/controllers/informeController.js


// CONTROLADOR — parte del patrón MVC

// Recibe el request HTTP, llama al service y devuelve respuesta.
// No tiene lógica de negocio — solo coordina.


const informeService = require('../services/informeService');


// GET /api/informes/dashboard
const getDashboard = async (req, res) => {
    try {
        // Obtenemos el id del usuario que viene en el header
        // Lo pone el api-gateway después de verificar el JWT
        const usuarioId = req.headers['x-user-id'] || 'anonimo';

        const informe = await informeService.generarDashboard(usuarioId);

        res.json({
            success: true,
            informe
        });

    } catch (err) {
        console.error('Error generando dashboard:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


// GET /api/informes/circuitos
// Para monitorear el estado de los circuit breakers
const getEstadoCircuitos = (req, res) => {
    try {
        const estado = informeService.obtenerEstadoCircuitos();
        res.json({
            success: true,
            circuitos: estado
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


module.exports = { getDashboard, getEstadoCircuitos };