// src/procesadores/ProcesadorERP.js
// Procesador específico para datos ERP (transacciones compras/ventas)

const ProcesadorBase = require('./ProcesadorBase');

class ProcesadorERP extends ProcesadorBase {
  constructor() {
    super('ProcesadorERP', 'transacciones_erp', [
      'numero_documento','tipo','fecha','año','mes',
      'codigo_producto','nombre_producto','categoria',
      'cuenta_contable','nombre_cuenta','cuenta_inventario',
      'sucursal','rut_tercero','nombre_tercero','tipo_tercero',
      'cantidad','precio_unitario','descuento',
      'subtotal','iva','total','año_importacion'
    ]);
  }

  mapearFila(fila) {
    if (!fila.numero_documento || !fila.tipo || !fila.fecha) {
      throw new Error('Faltan campos obligatorios: numero_documento, tipo, fecha');
    }
    return {
      numero_documento:  fila.numero_documento,
      tipo:              fila.tipo,
      fecha:             fila.fecha,
      'año':             parseInt(fila['año'] || fila.anio) || new Date(fila.fecha).getFullYear(),
      mes:               parseInt(fila.mes) || new Date(fila.fecha).getMonth() + 1,
      codigo_producto:   fila.codigo_producto || '',
      nombre_producto:   fila.nombre_producto || '',
      categoria:         fila.categoria || '',
      cuenta_contable:   fila.cuenta_contable || '',
      nombre_cuenta:     fila.nombre_cuenta || '',
      cuenta_inventario: fila.cuenta_inventario || '',
      sucursal:          fila.sucursal || '',
      rut_tercero:       fila.rut_tercero || '',
      nombre_tercero:    fila.nombre_tercero || '',
      tipo_tercero:      fila.tipo_tercero || '',
      cantidad:          parseFloat(fila.cantidad) || 0,
      precio_unitario:   parseFloat(fila.precio_unitario) || 0,
      descuento:         parseFloat(fila.descuento_pct) || 0,
      subtotal:          parseFloat(fila.subtotal) || 0,
      iva:               parseFloat(fila.iva) || 0,
      total:             parseFloat(fila.total) || 0,
      'año_importacion': parseInt(fila['año_importacion'] || fila.anio_importacion) || new Date().getFullYear()
    };
  }
}

module.exports = ProcesadorERP;