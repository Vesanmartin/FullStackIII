// src/factories/ProcesadorFactory.js
// PATRÓN: Factory Method
// Decide qué procesador crear según el módulo recibido.
// El controller no necesita saber qué procesador usar — solo pide uno.

const ProcesadorERP = require('../procesadores/ProcesadorERP');
const { ProcesadorEmpleados, ProcesadorRemuneraciones, ProcesadorAsistencia } = require('../procesadores/ProcesadorRRHH');
const { ProcesadorTerceros, ProcesadorInteracciones, ProcesadorProcesosVenta } = require('../procesadores/ProcesadorCRM');
const ProcesadorPOS = require('../procesadores/ProcesadorPOS');

class ProcesadorFactory {

  static crear(modulo) {
    const procesadores = {
      'erp_transacciones':   () => new ProcesadorERP(),
      'rrhh_empleados':      () => new ProcesadorEmpleados(),
      'rrhh_remuneraciones': () => new ProcesadorRemuneraciones(),
      'rrhh_asistencia':     () => new ProcesadorAsistencia(),
      'crm_terceros':        () => new ProcesadorTerceros(),
      'crm_interacciones':   () => new ProcesadorInteracciones(),
      'crm_procesos_venta':  () => new ProcesadorProcesosVenta(),
      'pos_ventas':          () => new ProcesadorPOS()
    };

    const fabricar = procesadores[modulo];

    if (!fabricar) {
      throw new Error(`Módulo '${modulo}' no reconocido. Disponibles: ${Object.keys(procesadores).join(', ')}`);
    }

    return fabricar();
  }

  static modulosDisponibles() {
    return [
      { id: 'erp_transacciones',   nombre: 'ERP — Transacciones',        tabla: 'transacciones_erp' },
      { id: 'rrhh_empleados',      nombre: 'RRHH — Empleados',           tabla: 'empleados' },
      { id: 'rrhh_remuneraciones', nombre: 'RRHH — Remuneraciones',      tabla: 'remuneraciones' },
      { id: 'rrhh_asistencia',     nombre: 'RRHH — Asistencia',          tabla: 'asistencia' },
      { id: 'crm_terceros',        nombre: 'CRM — Clientes/Proveedores', tabla: 'terceros_crm' },
      { id: 'crm_interacciones',   nombre: 'CRM — Interacciones',        tabla: 'interacciones_crm' },
      { id: 'crm_procesos_venta',  nombre: 'CRM — Procesos de Venta',    tabla: 'proceso_venta' },
      { id: 'pos_ventas',          nombre: 'POS — Ventas',               tabla: 'ventas_pos' }
    ];
  }
}

module.exports = ProcesadorFactory;