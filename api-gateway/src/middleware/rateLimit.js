// src/middleware/rateLimit.js

// MIDDLEWARE: Rate Limiting
// Limita la cantidad de requests por IP en un período de tiempo.
// Protege el sistema contra ataques de fuerza bruta y spam.
// Ejemplo: máximo 100 requests por IP cada 15 minutos.

const rateLimit = require('express-rate-limit');

//Limite general para todas las rutas.
const limitadorGeneral = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
    max: 100, // máximo 100 requests por IP
    message: {
        error: 'Demasiadas solicitudes',
        detalle: 'Has excedido el límite de 100 solicitudes por 15 minutos. Intenta nuevamente más tarde.'
    },
    // Muestra el tiempo restante en el header "Retry-After"
    standardHeaders: true,
    legacyHeaders: false,
});

// Limite específico para rutas de autenticación (más estricto): Evita ataques de fuerza bruta.
const limitadorLogin = rateLimit({
    windowMs: 15*60*1000, // 15 minutos
    max: 100, // máximo 100 intentos por IP
    message: {
        error: 'Demasiados intentos de inicio de sesión',
        detalle: 'Has excedido el límite de 5 intentos de inicio de sesión por 15 minutos. Intenta nuevamente más tarde.'
    }
});

module.exports = {limitadorGeneral, limitadorLogin};
