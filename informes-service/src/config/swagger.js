// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:       'Informes Service — Grupo Cordillera',
      version:     '1.0.0',
      description: 'Microservicio "informes" usando patrón Circuit Breaker'
    },
    servers: [
      { url: 'http://localhost:3004', description: 'Servidor local' }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;