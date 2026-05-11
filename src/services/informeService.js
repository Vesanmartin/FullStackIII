// src/services/informeService.js


// SERVICIO: Generador de Dashboard

// Llama a todos los microservicios y agrupa la información
// para generar el dashboard ejecutivo completo.
// Usa Circuit Breaker para proteger cada llamada.


const axios          = require('axios');
const CircuitBreaker = require('../patterns/circuitBreaker');

// ── URLs de los microservicios ────────────────────────────────────
// Cuando tus compañeros terminen sus servicios, solo cambia las URLs
const SERVICIOS = {
  kpi:   process.env.KPI_SERVICE_URL    || 'http://localhost:3002',
  auth:  process.env.AUTH_SERVICE_URL   || 'http://localhost:3001',
  datos: process.env.GESTION_SERVICE_URL   || 'http://localhost:3003',
};

// Un Circuit Breaker por cada servicio externo
const breakerKPI   = new CircuitBreaker({ nombre: 'KPI-Service',   limite: 3, tiempoEspera: 10000 });
const breakerAuth  = new CircuitBreaker({ nombre: 'Auth-Service',  limite: 3, tiempoEspera: 10000 });
const breakerDatos = new CircuitBreaker({ nombre: 'Gestion-Service',  limite: 3, tiempoEspera: 10000 });


class ServicioInformes {

  // Dashboard completo 
  async generarDashboard(usuarioId) {

    // Se llama a todos los servicios en paralelo
    // Si uno falla, los otros siguen funcionando
    const [kpis, usuarios, datos] = await Promise.all([
      this._obtenerKPIs(),
      this._obtenerUsuarios(),
      this._obtenerDatos()
    ]);

    return {
      titulo:      'Dashboard Ejecutivo — Grupo Cordillera',
      generadoPor: usuarioId,
      generadoEn:  new Date().toISOString(),
      estadoCircuitos: this.obtenerEstadoCircuitos(),
      resumen: {
        kpis,
        usuarios,
        datos
      }
    };
  }


  //  Obtener KPIs desde kpi-service
  async _obtenerKPIs() {
    try {
      return await breakerKPI.ejecutar(async () => {
        const respuesta = await axios.get(
          `${SERVICIOS.kpi}/api/kpis/tipos`,
          { timeout: 3000 }
        );
        return { disponible: true, datos: respuesta.data };
      });
    } catch (error) {
      console.warn('KPI Service no disponible');
      return { disponible: false, mensaje: 'KPIs temporalmente no disponibles' };
    }
  }


  // Obtener usuarios desde auth-service 
  async _obtenerUsuarios() {
    try {
      return await breakerAuth.ejecutar(async () => {
        const respuesta = await axios.get(
          `${SERVICIOS.auth}/api/auth/health`,
          { timeout: 3000 }
        );
        return { disponible: true, datos: respuesta.data };
      });
    } catch (error) {
      console.warn('Auth Service no disponible');
      return { disponible: false, mensaje: 'Usuarios temporalmente no disponibles' };
    }
  }


  // Obtener datos desde data-service
  async _obtenerDatos() {
    try {
      return await breakerDatos.ejecutar(async () => {
        const respuesta = await axios.get(
          `${SERVICIOS.datos}/api/data/health`,
          { timeout: 3000 }
        );
        return { disponible: true, datos: respuesta.data };
      });
    } catch (error) {
      console.warn('Data Service no disponible');
      return { disponible: false, mensaje: 'Datos temporalmente no disponibles' };
    }
  }


  // Estado de los circuit breakers
  obtenerEstadoCircuitos() {
    return {
      kpiBreaker:   breakerKPI.obtenerEstado(),
      authBreaker:  breakerAuth.obtenerEstado(),
      datosBreaker: breakerDatos.obtenerEstado()
    };
  }
}

// Singleton — una sola instancia
module.exports = new ServicioInformes();