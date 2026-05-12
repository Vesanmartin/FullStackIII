// src/handlers/importarAutomatico.js
// Funcion Lambda para programar importaciones automaticas
// Se activa desde el frontend cuando el usuario elige frecuencia + modulo

const handler = async (event) => {
  try {
    console.log('Lambda ejecutada: importarAutomatico');

    const body = JSON.parse(event.body || '{}');
    const { fuente, modulo, frecuencia, sucursal } = body;

    // Validar parametros
    if (!fuente || !modulo || !frecuencia) {
      return respuesta(400, {
        success: false,
        error: 'Faltan parametros: fuente, modulo, frecuencia'
      });
    }

    console.log(`Programando importacion ${frecuencia} para ${fuente} - ${modulo}`);

    // Simular procesamiento (en produccion aqui va el ConnectorFactory real)
    await simularProcesamiento(1000);

    // Calcular proxima ejecucion segun frecuencia
    const ahora = new Date();
    const proximaEjecucion = new Date(ahora);

    if (frecuencia === 'diaria') {
      proximaEjecucion.setDate(ahora.getDate() + 1);
    } else if (frecuencia === 'semanal') {
      proximaEjecucion.setDate(ahora.getDate() + 7);
    } else if (frecuencia === 'mensual') {
      proximaEjecucion.setMonth(ahora.getMonth() + 1);
    }

    return respuesta(200, {
      success: true,
      mensaje: `Importacion automatica ${frecuencia} programada para ${fuente}`,
      detalle: {
        fuente,
        modulo,
        frecuencia,
        sucursal:         sucursal || 'Todas',
        programadoEn:     ahora.toISOString(),
        proximaEjecucion: proximaEjecucion.toISOString()
      }
    });

  } catch (error) {
    console.error('Error en Lambda importarAutomatico:', error.message);
    return respuesta(500, {
      success: false,
      error: error.message
    });
  }
};

// HELPERS
const simularProcesamiento = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

const respuesta = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify(body)
});

module.exports = { handler };