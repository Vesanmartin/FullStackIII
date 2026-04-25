// src/routes/informeRoutes.js

// RUTAS del informes-service

// Define qué URLs existen y qué función del controlador las maneja


const express = require('express');
const router = express.Router();
const {
    getDashboard,
    getEstadoCircuitos
} = require('../controllers/informeController');


// GET http://localhost:3004/api/informes/health
// Para verificar que el servicio está vivo
router.get('/health', (req, res) => {
    res.json({
        servicio: 'pro ando el microservicio de informes-service',
        estado: 'Seeeeeeeeeeeeeee',
        timestamp: new Date().toISOString()
    });
});


// GET http://localhost:3004/api/informes/dashboard
// Genera el dashboard ejecutivo completo
router.get('/dashboard', getDashboard);


// GET http://localhost:3004/api/informes/circuitos
// Muestra el estado de los circuit breakers (monitoreo)
router.get('/circuitos', getEstadoCircuitos);


module.exports = router;