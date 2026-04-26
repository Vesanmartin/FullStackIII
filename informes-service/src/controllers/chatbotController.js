// src/controllers/chatbotController.js


// CONTROLADOR: Chatbot
// Recibe el request HTTP con la pregunta del usuario,
// llama al servicio del chatbot y devuelve la respuesta.


const servicioChatbot = require('../services/chatbotService');

// POST /api/informes/chat
const preguntar = async (req, res) => {
  try {
    // Extraemos la pregunta y datos del body
    const { pregunta, datos } = req.body;

    // Validamos que venga una pregunta
    if (!pregunta) {
      return res.status(400).json({
        success: false,
        error: 'Debes enviar una "pregunta" en el body'
      });
    }

    console.log(`Pregunta recibida: ${pregunta}`);

    // Llamamos al servicio del chatbot
    // Si no vienen datos, el chatbot responde con información general
    const resultado = await servicioChatbot.responder(pregunta, datos || {});

    res.json(resultado);

  } catch (error) {
    console.error('Error en chatbot controller:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { preguntar };