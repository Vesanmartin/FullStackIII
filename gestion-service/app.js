// gestion-service/app.js
// Punto de entrada del servicio de gestión de datos

const express = require('express');
const app = express();

// Permite recibir JSON en el body de las peticiones
app.use(express.json());

// Importa el middleware de manejo de errores
const errorHandler = require('./src/middlewares/error.middleware');

// Importa las rutas de gestion
const gestionRoutes = require('./src/routes/gestionRoutes');

// Registra las rutas bajo el prefijo /api
app.use('/api', gestionRoutes);

// Ruta raíz para verificar que el servicio está vivo
app.get('/', (req, res) => {
    res.send('Gestion Service funcionando');
});

// Middleware de errores va siempre al final
app.use(errorHandler);

// Puerto corregido — 3000 estaba ocupado por api-gateway
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Gestion Service corriendo en puerto ${PORT}`);
});