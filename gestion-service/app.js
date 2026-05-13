// gestion-service/app.js
// Punto de entrada del servicio de gestión de datos

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const opcionesSwagger = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Gestion Service API', version: '1.0.0' },
  },
  apis: ['./src/routes/*.js'],
};

const especificacion = swaggerJsdoc(opcionesSwagger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacion));
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

// Puerto corregido 
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Gestion Service corriendo en puerto ${PORT}`);
});