// src/procesadores/ProcesadorPOS.js
// Procesador para módulo POS — ventas por boleta

const ProcesadorBase = require('./procesadorBase');

class ProcesadorPOS extends ProcesadorBase {
  constructor() {
    super('ProcesadorPOS', 'ventas_pos', [
      'numero_boleta','sucursal','fecha','hora',
      'total_neto','iva','total','tipo_pago','id_cajero','id_tercero'
    ]);
  }

  mapearFila(fila) {
    if (!fila.numero_boleta || !fila.fecha) throw new Error('Faltan numero_boleta o fecha');
    return {
      numero_boleta: fila.numero_boleta,
      sucursal:      fila.sucursal,
      fecha:         fila.fecha,
      hora:          fila.hora || '00:00:00',
      total_neto:    parseFloat(fila.total_neto) || 0,
      iva:           parseFloat(fila.iva) || 0,
      total:         parseFloat(fila.total) || 0,
      tipo_pago:     fila.tipo_pago,
      id_cajero:     fila.id_cajero || '',
      id_tercero:    fila.id_tercero ? parseInt(fila.id_tercero) : null
    };
  }
}

module.exports = ProcesadorPOS;