// procesadores/ProcesadorBase.js
// Clase base para todos los procesadores
// Define la interfaz que deben implementar.

class ProcesadorBase {
  constructor(nombre, tabla, columnas) {
    this.nombre   = nombre;
    this.tabla    = tabla;
    this.columnas = columnas;
  }

  // Cada procesador debe implementar este método
  mapearFila(fila) {
    throw new Error(`${this.nombre} debe implementar mapearFila()`);
  }

  // Limpia BOM y espacios de las keys de una fila
  limpiarFila(fila) {
    const filaLimpia = {};
    for (const key of Object.keys(fila)) {
      const keySaneada = key.replace(/^\ufeff/, '').trim();
      filaLimpia[keySaneada] = fila[key];
    }
    return filaLimpia;
  }

  // Procesa todas las filas del CSV
  procesar(filas) {
    const registros = [];
    const errores   = [];

    for (const fila of filas) {
      try {
        // Limpiar BOM y espacios en cada fila
        const filaLimpia = this.limpiarFila(fila);
        const registro = this.mapearFila(filaLimpia);
        if (registro) registros.push(registro);
      } catch (e) {
        errores.push(`Error en fila: ${e.message}`);
      }
    }

    console.log(`${this.nombre}: ${registros.length} registros válidos, ${errores.length} errores`);
    if (errores.length > 0) console.log('Primer error:', errores[0]);

    return { registros, errores };
  }
}

module.exports = ProcesadorBase;