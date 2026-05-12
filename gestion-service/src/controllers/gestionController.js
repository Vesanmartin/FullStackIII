// src/controllers/gestionController.js
// El controller ya no habla con la BD directamente
// Delega esa responsabilidad al Repository

const {
    ProductoRepository,
    SucursalRepository,
    EmpleadoRepository,
    TerceroRepository
} = require('../repositories/gestionRepository');

// Obtiene todos los productos usando el repositorio
const getProductos = async (req, res) => {
    const productos = await ProductoRepository.obtenerTodos();
    res.json(productos);
};

// Obtiene todas las sucursales usando el repositorio
const getSucursales = async (req, res) => {
    const sucursales = await SucursalRepository.obtenerTodas();
    res.json(sucursales);
};

// Obtiene todos los empleados usando el repositorio
const getEmpleados = async (req, res) => {
    const empleados = await EmpleadoRepository.obtenerTodos();
    res.json(empleados);
};

// Obtiene todos los terceros usando el repositorio
const getTerceros = async (req, res) => {
    const terceros = await TerceroRepository.obtenerTodos();
    res.json(terceros);
};

module.exports = {
    getProductos,
    getSucursales,
    getEmpleados,
    getTerceros
};