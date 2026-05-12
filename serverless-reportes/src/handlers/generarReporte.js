// src/handlers/generarReporte.js
// Simula funciones AWS Lambda (serverless>) para generación de reportes
// En producción estas funciones se despliegan en AWS Lambda
// y se ejecutan solo cuando se necesitan (serverless = sin servidor permanente)

// FUNCIÓN 1: Generar reporte bajo demanda
const handler = async (event) => {
  try {
    console.log('Lambda ejecutada: generarReporte');

    // En Lambda el body viene como string, hay que parsearlo
    const body = JSON.parse(event.body || '{}');
    const { sucursal, tipo, periodo } = body;

    // Validar parámetros
    if (!sucursal || !tipo || !periodo) {
      return respuesta(400, {
        success: false,
        error: 'Faltan parámetros: sucursal, tipo, periodo'
      });
    }

    // Simular procesamiento pesado (en producción aquí va la lógica real)
    console.log(` Generando reporte: ${tipo} para ${sucursal} - ${periodo}`);
    await simularProcesamiento(1500);

    const reporte = {
      id:        `RPT-${Date.now()}`,
      sucursal,
      tipo,
      periodo,
      generadoEn: new Date().toISOString(),
      datos: {
        ventasTotales:    Math.floor(Math.random() * 1000000),
        transacciones:    Math.floor(Math.random() * 5000),
        ticketPromedio:   Math.floor(Math.random() * 50000),
        crecimiento:      `${(Math.random() * 20).toFixed(1)}%`
      }
    };

    console.log(`Reporte generado: ${reporte.id}`);

    return respuesta(200, {
      success: true,
      reporte
    });

  } catch (error) {
    console.error('Error en Lambda:', error.message);
    return respuesta(500, {
      success: false,
      error: error.message
    });
  }
};

// FUNCIÓN 2: Reporte mensual automático
// En producción se dispara con un schedule (cron) en AWS
const reporteMensual = async (event) => {
  try {
    console.log('Lambda ejecutada: reporteMensual');

    const mesActual = new Date().toISOString().slice(0, 7); // "2026-04"

    // Simular generación de reportes para todas las sucursales
    const sucursales = ['Santiago Centro', 'Providencia', 'Maipú', 'Las Condes'];

    const reportes = await Promise.all(
      sucursales.map(async (sucursal) => {
        await simularProcesamiento(500);
        return {
          sucursal,
          periodo:  mesActual,
          ventas:   Math.floor(Math.random() * 1000000),
          estado:   'completado'
        };
      })
    );

    console.log(` Informes mensuales generados para ${sucursales.length} sucursales`);

    return respuesta(200, {
      success:   true,
      periodo:   mesActual,
      total:     reportes.length,
      reportes
    });

  } catch (error) {
    console.error('Error en Lambda mensual:', error.message);
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

module.exports = { handler, reporteMensual };