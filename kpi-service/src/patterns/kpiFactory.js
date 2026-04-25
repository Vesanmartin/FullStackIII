// src/patterns/kpiFactory.js

// Patrón Factory Method
// Grupo Cordillera tiene distintos KPIs: ventas, inventario, rentabilidad.
// Si usamos if/else para cada tipo, cada vez que agregamos uno nuevo
// habria  que modificar todo el código.
// con Factory Method se agrega una clase nueva y se registra.

// Clase base 
// Define el contrato: toda subclase DEBE implementar calculate()
class CalculadorKPI {

  calculate(data) {
    // ojo:: Si una subclase no implementa esto, lanza error
    throw new Error(`${this.constructor.name} debe implementar calculate()`);
  }

  validate(data) {
    // Validación común para todos  (no hay que repetirla en cada subclase)
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Necesitas enviar un array con datos');
    }
  }
}

// Calculador de Ventas 
// Hereda validate() de KPICalculator  (no hay que repetirla)
class CalculadorVentas extends CalculadorKPI {

  calculate(data) {
    this.validate(data); // validación heredada

    // reduce() suma todos los montos del array
    const total    = data.reduce((suma, item) => suma + (item.amount || 0), 0);
    const promedio = total / data.length;

    return {
      tipo:           'Ventas',
      totalVentas:    data.length,
      ingresoTotal:   total.toFixed(0),   // sin  decimales
      ticketPromedio: promedio.toFixed(0)
    };
  }
}

// Calculador de Inventario
class CalculadorInventario extends CalculadorKPI {

  calculate(data) {
    this.validate(data);

    // filter() devuelve solo los productos con stock bajo el mínimo
    const criticos = data.filter(item => item.stock <= item.minStock);

    return {
      tipo:              'Inventario',
      totalProductos:    data.length,
      stockCritico:      criticos.length,
      porcentajeCritico: ((criticos.length / data.length) * 100).toFixed(1) + '%'
    };
  }
}

// Calculador de Rentabilidad 
class CalculadorRentabilidad extends CalculadorKPI {

  calculate(data) {
    this.validate(data);

    const ingresos = data.reduce((s, i) => s + (i.revenue || 0), 0);
    const costos   = data.reduce((s, i) => s + (i.cost    || 0), 0);
    const utilidad = ingresos - costos;

    // Evitar que el sistema divida por cero cuando no hay ingresos (daria error)
    const margen = ingresos > 0
      ? ((utilidad / ingresos) * 100).toFixed(2)
      : '0.00';

    return {
      tipo:     'Rentabilidad',
      ingresos: ingresos.toFixed(2),
      costos:   costos.toFixed(2),
      utilidad: utilidad.toFixed(2),
      margen:   margen + '%'
    };
  }
}


// Calculador tendencias en factory

class CalculadorTendencias extends CalculadorKPI {

  calculate(data) {
    this.validate(data);

    // Ordenar por periodo
    const ordenado = data.sort((a, b) =>
      new Date(a.periodo) - new Date(b.periodo)
    );

    // Calcular variación entre períodos
    const variaciones = [];
    for (let i = 1; i < ordenado.length; i++) {
      const anterior = ordenado[i - 1].ventas;
      const actual   = ordenado[i].ventas;
      const variacion = ((actual - anterior) / anterior * 100).toFixed(1);

      variaciones.push({
        periodo:   ordenado[i].periodo,
        ventas:    actual,
        variacion: parseFloat(variacion),
        tendencia: variacion > 0 ? 'Tendencia al alza' : 'Tendencia a la baja'
      });
    }

    // Tendencia general
    const promedioVariacion = variaciones.reduce(
      (s, v) => s + v.variacion, 0
    ) / variaciones.length;

    return {
      tipo:              'Tendencias',
      periodos:          ordenado.length,
      variaciones,
      promedioVariacion: promedioVariacion.toFixed(1) + '%',
      tendenciaGeneral:  promedioVariacion > 0
        ? 'Tendencia al alza'
        : 'Tendencia a la baja',
      mejorPeriodo: ordenado.reduce((max, item) =>
        item.ventas > max.ventas ? item : max
      ).periodo
    };
  }
}


// Esta es la clase principal del Factory Method
// El controlador solo habla con KPIFactory, nunca instancia
// SalesKPICalculator directamente.
class FabricaKPI {

  // Diccionario: tipo : clase
  // El # lo hace privado, solo KPIFactory puede verlo
  static #calculatores = {
    ventas:         CalculadorVentas,
    inventario:     CalculadorInventario,
    rentabilidad: CalculadorRentabilidad,
    tendencias: CalculadorTendencias,
  };

  // KPIFactory.create('ventas') :  devuelve new SalesKPICalculator()
  static crear(type) {
    const Calculador = this.#calculatores[type];

    // Si el tipo no existe, avisamos con los disponibles
    if (!Calculador) {
      const disponibles = Object.keys(this.#calculatores).join(', ');
      throw new Error(`Tipo "${type}" no existe. Disponibles: ${disponibles}`);
    }

    // Crea y devuelve la instancia correcta
    return new Calculador();
  }

  // Útil para mostrar al frontend qué tipos puede pedir
  static getTiposDisponibles() {
    return Object.keys(this.#calculatores);
  }
}


  
// Exportamos solo la fábrica porque no se necesita que nadie de afuera conozca las subclases. El controlador solo habla con KPIFactory, nunca con SalesKPICalculator directamente.

module.exports = FabricaKPI;