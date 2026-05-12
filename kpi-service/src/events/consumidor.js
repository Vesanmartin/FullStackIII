// kpi-service/src/events/consumidor.js
// Escucha la cola y recalcula KPIs automáticamente
// cuando informes-service publica datos nuevos.

const { conectar, COLAS } = require('../config/rabbitmq');

const iniciarConsumidor = async () => {
  try {
    const canal = await conectar();
    if (!canal) return;

    // Procesar 1 mensaje a la vez
    canal.prefetch(1);

    console.log(` kpi-service escuchando cola: ${COLAS.DATOS_IMPORTADOS}`);

    canal.consume(COLAS.DATOS_IMPORTADOS, async (msg) => {
      if (!msg) return;

      try {
        const evento = JSON.parse(msg.content.toString());

        console.log(' Evento recibido:', evento.evento);
        console.log(`   Sucursal: ${evento.datos?.sucursal} | Tipo: ${evento.datos?.tipo}`);
        console.log(`   Timestamp: ${evento.timestamp}`);

        // Procesar el evento
        await procesarEvento(evento);

        // Confirmar que el mensaje fue procesado OK
        canal.ack(msg);

      } catch (error) {
        console.error(' Error procesando mensaje:', error.message);
        // Rechazar sin reencolar (evita loop infinito)
        canal.nack(msg, false, false);
      }
    });

  } catch (error) {
    console.error(' Error iniciando consumidor:', error.message);
  }
};

const procesarEvento = async (evento) => {
  const { sucursal, tipo, periodo } = evento.datos;

  console.log(` Calculando KPIs para sucursal: ${sucursal}, tipo: ${tipo}`);

  // Aquí va tu lógica real de cálculo de KPIs
  // Por ahora simulamos el procesamiento
  await new Promise(r => setTimeout(r, 200));

  console.log(` KPIs calculados para ${sucursal} - periodo: ${periodo}`);
};

module.exports = { iniciarConsumidor };