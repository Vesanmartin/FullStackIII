// src/patterns/kpiFactory.js
// Acá va patrón Factory Method, que está en informe  y en los requerimientos del proyecto.
// Resuelve : Define distintos cálculos de KPI_ ventas , inventario, flujos, etc 
// La idea es que si se agrega un KPi nuevo , solo se añade una clase y se registra, y no se vuelve a tocar.

// Clase base
// Se define base: Acá ocupamos calculate() y validate()
// Ojo, al crear una sub clase y no implementar calculate() y validate(), va a dar error

class KPICalculator {

    //las subclases deben implementar calculate(data) y validate(data)
    calculate(data) {
        throw new Error("calculate() debe ser implementado")
    }
    // Validacion para todos los calculadores
    // Esta clase base, no debe repetirse en las sub clases
    validate(data) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("validate() debe ser implementado")
        }
    }

}