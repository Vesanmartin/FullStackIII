// src/procesadores/ProcesadorCRM.js
// Procesador para módulo CRM — terceros, interacciones, procesos venta

const ProcesadorBase = require('./ProcesadorBase');

class ProcesadorTerceros extends ProcesadorBase {
  constructor() {
    super('ProcesadorTerceros', 'terceros_crm', [
      'rut','nombre','email','telefono','tipo','ciudad','region',
      'segmento','condicion_pago','limite_credito',
      'vendedor_asignado','comprador_asignado','activo','fecha_registro'
    ]);
  }

  mapearFila(fila) {
    if (!fila.rut || !fila.nombre) throw new Error('Faltan rut o nombre');
    return {
      rut:                fila.rut,
      nombre:             fila.nombre,
      email:              fila.email || '',
      telefono:           fila.telefono || '',
      tipo:               fila.tipo,
      ciudad:             fila.ciudad || '',
      region:             fila.region || '',
      segmento:           fila.segmento || 'empresa',
      condicion_pago:     fila.condicion_pago || 'contado',
      limite_credito:     parseFloat(fila.limite_credito) || 0,
      vendedor_asignado:  fila.vendedor_asignado || '',
      comprador_asignado: fila.comprador_asignado || '',
      activo:             ['True','true','1'].includes(fila.activo) ? 1 : 0,
      fecha_registro:     fila.fecha_registro
    };
  }
}

class ProcesadorInteracciones extends ProcesadorBase {
  constructor() {
    super('ProcesadorInteracciones', 'interacciones_crm', [
      'id_tercero','tipo','fecha','descripcion','resultado','id_empleado'
    ]);
  }

  mapearFila(fila) {
    if (!fila.id_tercero || !fila.fecha) throw new Error('Faltan id_tercero o fecha');
    return {
      id_tercero:  parseInt(fila.id_tercero),
      tipo:        fila.tipo,
      fecha:       fila.fecha,
      descripcion: fila.descripcion || '',
      resultado:   fila.resultado || 'neutro',
      id_empleado: fila.id_empleado || ''
    };
  }
}

class ProcesadorProcesosVenta extends ProcesadorBase {
  constructor() {
    super('ProcesadorProcesosVenta', 'proceso_venta', [
      'id_tercero','id_empleado','etapa','monto_estimado',
      'monto_final','tipo_pago','fecha_inicio','fecha_cierre','sucursal'
    ]);
  }

  mapearFila(fila) {
    if (!fila.id_tercero || !fila.fecha_inicio) throw new Error('Faltan campos obligatorios');
    return {
      id_tercero:     parseInt(fila.id_tercero),
      id_empleado:    fila.id_empleado || '',
      etapa:          fila.etapa,
      monto_estimado: parseFloat(fila.monto_estimado) || 0,
      monto_final:    parseFloat(fila.monto_final) || 0,
      tipo_pago:      fila.tipo_pago || 'contado',
      fecha_inicio:   fila.fecha_inicio,
      fecha_cierre:   fila.fecha_cierre || null,
      sucursal:       fila.sucursal || ''
    };
  }
}

module.exports = { ProcesadorTerceros, ProcesadorInteracciones, ProcesadorProcesosVenta };