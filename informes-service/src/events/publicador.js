// informes-service/src/events/publicador.js
// Publica un evento cada vez que se generan datos nuevos.
// informes-service NO sabe quién lo consume: bajo acoplamiento.

const { conectar, COLAS } = require('../config/rabbitmq');

const publicarDatosImportados = async (payload) => {
  try {
    const canal = await conectar();
    if (!canal) {
      console.warn('RabbitMQ no disponible, evento no publicado');
      return;
    }

    const mensaje = {
      evento:    'DATOS_IMPORTADOS',
      timestamp: new Date().toISOString(),
      datos:     payload  // { sucursal, tipo, registros, periodo }
    };

    canal.sendToQueue(
      COLAS.DATOS_IMPORTADOS,
      Buffer.from(JSON.stringify(mensaje)),
      { persistent: true }  // el mensaje sobrevive reinicios de RabbitMQ
    );

    console.log(` Evento publicado → cola: ${COLAS.DATOS_IMPORTADOS}`);
    console.log(`   Sucursal: ${payload.sucursal} | Tipo: ${payload.tipo}`);

  } catch (error) {
    // No bloqueamos el flujo principal si RabbitMQ falla
    console.error(' Error publicando evento:', error.message);
  }
};

module.exports = { publicarDatosImportados };