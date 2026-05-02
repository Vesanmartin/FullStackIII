// src/adapters/dashboardAdapter.js


// PATRÓN: Adapter (parte del BFF)

// Se utiliza cuando el frontend necesita los datos en un formato específico
// pero cada microservicio devuelve formatos distintos.
//
// Entonces, el Adapter transforma los datos al formato exacto
// que necesita el frontend React.
//
// Ventaja: Si cambia el backend, solo modificar el adapter.
// El componente React nunca se entera.


class AdaptadorDashboard {

  // Transforma la respuesta cruda del informes-service
  // al formato que espera el frontend React
  adaptarParaFrontend(datosRaw) {
    return {
      ultimaActualizacion: datosRaw.generadoEn,
      tieneAlertas:        datosRaw.alertas?.length > 0,
      alertas:             datosRaw.alertas || [],

      // Tarjetas del dashboard
      tarjetas: this._construirTarjetas(datosRaw.resumen),

      // Estado del sistema para la barra de estado
      estadoSistema: this._construirEstadoSistema(datosRaw.estadoCircuitos)
    };
  }

  // Construye las tarjetas de KPI para el frontend
  _construirTarjetas(resumen) {
    if (!resumen) return [];

    const tarjetas = [];

    if (resumen.kpis?.disponible) {
      tarjetas.push({
        id:     'kpis',
        titulo: 'KPIs',
        estado: 'ok',
        datos:  resumen.kpis.datos
      });
    } else {
      tarjetas.push({
        id:      'kpis',
        titulo:  'KPIs',
        estado:  'no-disponible',
        mensaje: resumen.kpis?.mensaje || 'No disponible'
      });
    }

    if (resumen.usuarios?.disponible) {
      tarjetas.push({
        id:     'usuarios',
        titulo: 'Usuarios',
        estado: 'ok',
        datos:  resumen.usuarios.datos
      });
    } else {
      tarjetas.push({
        id:      'usuarios',
        titulo:  'Usuarios',
        estado:  'no-disponible',
        mensaje: resumen.usuarios?.mensaje || 'No disponible'
      });
    }

    if (resumen.gestion?.disponible) {
      tarjetas.push({
        id:     'gestion',
        titulo: 'Gestión',
        estado: 'ok',
        datos:  resumen.gestion.datos
      });
    } else {
      tarjetas.push({
        id:      'gestion',
        titulo:  'Gestión',
        estado:  'no-disponible',
        mensaje: resumen.gestion?.mensaje || 'No disponible'
      });
    }

    return tarjetas;
  }

  // Construye el estado de los circuit breakers
  _construirEstadoSistema(circuitos) {
    if (!circuitos) return { general: 'desconocido', servicios: [] };

    const servicios = Object.entries(circuitos).map(([clave, cb]) => ({
      nombre: cb.nombre || clave,
      estado: cb.estado,
      // CLOSED = verde, HALF_OPEN = amarillo, OPEN = rojo
      color:  cb.estado === 'CLOSED' ? 'verde'
            : cb.estado === 'HALF_OPEN' ? 'amarillo'
            : 'rojo'
    }));

    const todoOk = servicios.every(s => s.estado === 'CLOSED');

    return {
      general:   todoOk ? 'saludable' : 'degradado',
      servicios
    };
  }
}

// Singleton — una sola instancia
module.exports = new AdaptadorDashboard();