// src/config/swagger.js
// Configuración de Swagger para documentar los endpoints del kpi-service

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KPI Service — Grupo Cordillera',
      version: '1.0.0',
      description: 'Microservicio de indicadores KPI usando Factory Method'
    },
    servers: [
      { url: 'http://localhost:3002', description: 'Servidor local' }
    ]
  },
  // Busca comentarios Swagger en estos archivos
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;