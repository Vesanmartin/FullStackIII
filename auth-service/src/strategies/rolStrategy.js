// auth-service/src/strategies/rolStrategy.js
// PATRÓN: Strategy
class EstrategiaRol {
  getPermisos() {
    throw new Error("getPermisos() debe implementarse en cada estrategia");
  }
}

// Acceso total — solo para demo
class EstrategiaSuperSaiyajin extends EstrategiaRol {
  getPermisos() {
    return {
      rol: "supersaiyajin",
      modulos: {
        dashboard:      true,
        gestion:        true,
        importacion:    true,
        informes:       true,
        administracion: true,
        kpi:            true
      },
      puedeCrearUsuarios:    true,
      puedeEliminarUsuarios: true,
      puedeVerReportes:      true
    };
  }
}

// Administra usuarios y gestión — no opera ni ve reportes
class EstrategiaAdmin extends EstrategiaRol {
  getPermisos() {
    return {
      rol: "admin",
      modulos: {
        dashboard:      false,
        gestion:        true,
        importacion:    false,
        informes:       false,
        administracion: true,
        kpi:            false
      },
      puedeCrearUsuarios:    true,
      puedeEliminarUsuarios: true,
      puedeVerReportes:      false
    };
  }
}

// Ve informes, chatbot y KPIs — no opera el sistema
class EstrategiaGerente extends EstrategiaRol {
  getPermisos() {
    return {
      rol: "gerente",
      modulos: {
        dashboard:      false,
        gestion:        false,
        importacion:    false,
        informes:       true,
        administracion: false,
        kpi:            true
      },
      puedeCrearUsuarios:    false,
      puedeEliminarUsuarios: false,
      puedeVerReportes:      true
    };
  }
}

// Importa datos y ve dashboard — no gestiona ni reportea
class EstrategiaOperador extends EstrategiaRol {
  getPermisos() {
    return {
      rol: "operador",
      modulos: {
        dashboard:      true,
        gestion:        true,
        importacion:    true,
        informes:       false,
        administracion: false,
        kpi:            false
      },
      puedeCrearUsuarios:    false,
      puedeEliminarUsuarios: false,
      puedeVerReportes:      false
    };
  }
}

class ContextoPermisos {
  constructor(rol) {
    switch (rol) {
      case "supersaiyajin":
        this.estrategia = new EstrategiaSuperSaiyajin();
        break;
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