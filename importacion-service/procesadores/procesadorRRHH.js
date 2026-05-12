// src/procesadores/ProcesadorRRHH.js
// Procesador para módulo RRHH — empleados, remuneraciones, asistencia

const ProcesadorBase = require('./ProcesadorBase');

class ProcesadorEmpleados extends ProcesadorBase {
  constructor() {
    super('ProcesadorEmpleados', 'empleados', [
      'id_empleado','rut','nombre','apellido','cargo','departamento',
      'sucursal','fecha_ingreso','tipo_contrato','sueldo_base','activo'
    ]);
  }

  mapearFila(fila) {
    if (!fila.id_empleado || !fila.rut) throw new Error('Faltan id_empleado o rut');
    return {
      id_empleado:   fila.id_empleado,
      rut:           fila.rut,
      nombre:        fila.nombre,
      apellido:      fila.apellido,
      cargo:         fila.cargo,
      departamento:  fila.departamento,
      sucursal:      fila.sucursal,
      fecha_ingreso: fila.fecha_ingreso,
      tipo_contrato: fila.tipo_contrato || 'indefinido',
      sueldo_base:   parseFloat(fila.sueldo_base) || 0,
      activo:        ['True','true','1'].includes(fila.activo) ? 1 : 0
    };
  }
}

class ProcesadorRemuneraciones extends ProcesadorBase {
  constructor() {
    super('ProcesadorRemuneraciones', 'remuneraciones', [
      'id_empleado','periodo_mes','periodo_anio','sueldo_base',
      'bono_produccion','bono_asistencia','horas_extra','valor_hora_extra',
      'total_horas_extra','descuento_salud','descuento_afp','otros_descuentos',
      'total_haberes','total_descuentos','liquido_pagar'
    ]);
  }

  mapearFila(fila) {
    if (!fila.id_empleado) throw new Error('Falta id_empleado');
    return {
      id_empleado:      fila.id_empleado,
      periodo_mes:      parseInt(fila.periodo_mes),
      periodo_anio:     parseInt(fila.periodo_anio),
      sueldo_base:      parseFloat(fila.sueldo_base) || 0,
      bono_produccion:  parseFloat(fila.bono_produccion) || 0,
      bono_asistencia:  parseFloat(fila.bono_asistencia) || 0,
      horas_extra:      parseInt(fila.horas_extra) || 0,
      valor_hora_extra: parseFloat(fila.valor_hora_extra) || 0,
      total_horas_extra:parseFloat(fila.total_horas_extra) || 0,
      descuento_salud:  parseFloat(fila.descuento_salud) || 0,
      descuento_afp:    parseFloat(fila.descuento_afp) || 0,
      otros_descuentos: parseFloat(fila.otros_descuentos) || 0,
      total_haberes:    parseFloat(fila.total_haberes) || 0,
      total_descuentos: parseFloat(fila.total_descuentos) || 0,
      liquido_pagar:    parseFloat(fila.liquido_pagar) || 0
    };
  }
}

class ProcesadorAsistencia extends ProcesadorBase {
  constructor() {
    super('ProcesadorAsistencia', 'asistencia', [
      'id_empleado','fecha','estado','horas_trabajadas','horas_extra','observacion'
    ]);
  }

  mapearFila(fila) {
    if (!fila.id_empleado || !fila.fecha) throw new Error('Faltan id_empleado o fecha');
    return {
      id_empleado:      fila.id_empleado,
      fecha:            fila.fecha,
      estado:           fila.estado,
      horas_trabajadas: parseFloat(fila.horas_trabajadas) || 0,
      horas_extra:      parseFloat(fila.horas_extra) || 0,
      observacion:      fila.observacion || ''
    };
  }
}

module.exports = { ProcesadorEmpleados, ProcesadorRemuneraciones, ProcesadorAsistencia };