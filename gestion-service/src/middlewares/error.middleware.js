// Middleware de manejo de errores centralizado
// Se ejecuta cuando ocurre un error en cualquier parte de la app
const errorHandler = (err, req, res, next) => {

    // Muestra el error completo en la consola (útil para debugging)
    console.error(err.stack);

    // Responde al cliente con un código HTTP
    // Si el error tiene status, lo usa; si no, devuelve 500 (error interno)
    res.status(err.status || 500).json({

        // Mensaje de error
        // Si el error trae mensaje, lo usa; si no, muestra uno genérico
        mensaje: err.message || "Error interno del servidor"
    });
};

// Exporta el middleware para poder usarlo en app.js
module.exports = errorHandler;