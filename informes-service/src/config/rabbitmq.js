// src/config/rabbitmq.js
// Conexión reutilizable a RabbitMQ con reconexión automática

const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://admin:admin123@localhost:5672';

// Colas del proyecto
const COLAS = {
  DATOS_IMPORTADOS: 'datos.importados',  // informes-service : kpi-service
  KPIS_CALCULADOS:  'kpis.calculados'    // kpi-service : futuro uso
};

let conexion = null;
let canal    = null;

const conectar = async () => {
  if (canal) return canal;

  try {
    conexion = await amqp.connect(RABBITMQ_URL);
    canal    = await conexion.createChannel();

    // Declarar colas (si ya existen no hace nada)
    await canal.assertQueue(COLAS.DATOS_IMPORTADOS, { durable: true });
    await canal.assertQueue(COLAS.KPIS_CALCULADOS,  { durable: true });

    console.log('Conectado a RabbitMQ');

    // Reconexión automática si se cae
    conexion.on('close', () => {
      console.warn('RabbitMQ desconectado, reconectando en 5s...');
      canal    = null;
      conexion = null;
      setTimeout(conectar, 5000);
    });

    return canal;

  } catch (error) {
    console.error('Error RabbitMQ:', error.message);
    canal    = null;
    conexion = null;
    setTimeout(conectar, 5000);
  }
};

module.exports = { conectar, COLAS };