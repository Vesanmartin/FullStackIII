// src/routes/chatbotRoutes.js

const express       = require('express');
const enrutador     = express.Router();
const { preguntar } = require('../controllers/chatbotController');

/**
 * @swagger
 * /api/informes/chat:
 *   post:
 *     summary: Pregunta al chatbot sobre los datos de Grupo Cordillera
 *     description: Usa IA (llama3.2) para responder preguntas en español
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pregunta:
 *                 type: string
 *                 example: ¿Cómo van las ventas de enero?
 *               datos:
 *                 type: object
 *                 example:
 *                   ventas: { enero: 4500000, febrero: 5200000 }
 *                   inventario: { criticos: 3 }
 *     responses:
 *       200:
 *         description: Respuesta del chatbot
 *       400:
 *         description: Falta la pregunta
 *       500:
 *         description: Error del chatbot
 */
enrutador.post('/chat', preguntar);

module.exports = enrutador;