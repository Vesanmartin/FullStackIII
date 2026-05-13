// src/services/chatbotService.js

// SERVICIO: Chatbot con Ollama (llama3.2)
// Recibe una pregunta del usuario junto con datos de Grupo Cordillera
// y usa la IA para generar una respuesta en lenguaje natural.


const { Ollama } = require('ollama');
const ollamaClient = new Ollama({ host: 'http://host.docker.internal:11434' });

class ServicioChatbot {

  // Método principal
  // pregunta: string con la consulta del usuario
  // datos:    objeto con info de Grupo (ventas, inventario, etc.)
  async responder(pregunta, datos = {}) {
    try {
      // Construimos el contexto con los datos del negocio("datos" es el contexto que la bbdd le pasa a traves de contextoService)
      const contexto = this._construirContexto(datos);

      // Enviamos la pregunta + contexto a Ollama
      const resultado = await ollamaClient.chat({
        model: 'llama3.2',
        messages: [
          {
            // system: define cómo debe comportarse la IA
            role: 'system',  //le dice al modelo coomo debe comportarse, evita que el modelo invente números
            content: `Eres CORDI, la IA que Grupo Cordillera contrató porque era más barato
            que contratar analistas. Tienes acceso a los datos reales del negocio y los
            presentas con brutal honestidad sin filtro corporativo.
            Si las ventas bajaron, no lo suavizas. Si una sucursal está hundida, lo dices.
            Si alguien pregunta algo y no tienes los datos, respondes con desprecio educado.
            REGLA INQUEBRANTABLE: Solo usas los números que aparecen en los datos entregados.
            Inventar cifras es lo único que no harías — tienes estándares, aunque bajos.
            Respondes siempre en español.

            Datos actuales del negocio:
            ${contexto}`
          },
          {
            // user: es la pregunta del usuario
            role: 'user',
            content: pregunta  //(lo que escribe usuario en el front)
          }
        ]
      });

      return {
        success:   true,
        pregunta,
        respuesta: resultado.message.content,
        modelo:    'llama3.2'
      };

    } catch (error) {
      console.error('Error en chatbot:', error.message);
      throw new Error(`Error al procesar la pregunta: ${error.message}`);
    }
  }


  // Construye el contexto con los datos del negocio
  // Convierte el objeto de datos a texto para que la IA lo entienda (metodo privado)
  _construirContexto(datos) {
    // Si no hay datos, avisamos a la IA
    if (!datos || Object.keys(datos).length === 0) {
      return 'No hay datos disponibles en este momento.';
    }

    // JSON.stringify convierte el objeto a texto legible, los asistentes respnden mejor cuando el contexto esta bien formateado. El "null" es para no usar un replacer, y el "2" es para agregar sangría y que sea más legible
    // El "2" agrega sangría para que sea más legible
    return JSON.stringify(datos, null, 2);
  }
}

// Exportamos una sola instancia — Singleton implícito
// Así no se crea un objeto nuevo cada vez que se importa
module.exports = new ServicioChatbot();