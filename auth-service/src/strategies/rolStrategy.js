// auth-service/src/strategies/rolStrategy.js
// PATRÓN: Strategy
// Define una familia de algoritmos intercambiables — cada rol tiene
// su propia estrategia de permisos. Esto para los usuarios y el perfil y los permisos que se asignaran.


// Estrategia base 
// Todas las estrategias deben implementar getPermisos()
class EstrategiaRol {
  getPermisos() {
    throw new Error("getPermisos() debe implementarse en cada estrategia");
  }
}

// Estrategia Admin
// Acceso total al sistema + puede crear y eliminar usuarios
class EstrategiaAdmin extends EstrategiaRol {
  getPermisos() {
    return {
      rol: "admin",
      modulos: {
        dashboard:   false,
        gestion:     false,
        importacion: false,
        informes:    false
      },
      puedeCrearUsuarios:    true,
      puedeEliminarUsuarios: true,
      puedeVerReportes:      true
    };
  }
}

// Estrategia Gerente
// Acceso a dashboard, gestión e informes — no puede importar datos
class EstrategiaGerente extends EstrategiaRol {
  getPermisos() {
    return {
      rol: "gerente",
      modulos: {
        dashboard:   true,
        gestion:     false,
        importacion: false,
        informes:    true
      },
      puedeCrearUsuarios:    false,
      puedeEliminarUsuarios: false,
      puedeVerReportes:      true
    };
  }
}

// Estrategia Operador 
// Acceso solo a importación y dashboard — no ve gestión ni informes
class EstrategiaOperador extends EstrategiaRol {
  getPermisos() {
    return {
      rol: "operador",
      modulos: {
        dashboard:   false,
        gestion:     false,
        importacion: true,
        informes:    false
      },
      puedeCrearUsuarios:    false,
      puedeEliminarUsuarios: false,
      puedeVerReportes:      false
    };
  }
}
// Contexto
// El contexto recibe un rol como string y selecciona la estrategia
// correcta automáticamente. El resto del sistema solo usa el contexto,
// nunca instancia las estrategias directamente.
class ContextoPermisos {
  constructor(rol) {
    switch (rol) {
      case "admin":
        this.estrategia = new EstrategiaAdmin();
        break;
      case "gerente":
        this.estrategia = new EstrategiaGerente();
        break;
      case "operador":
      default:
        this.estrategia = new EstrategiaOperador();
        break;
    }
  }

  getPermisos() {
    return this.estrategia.getPermisos();
  }
}

export { ContextoPermisos };