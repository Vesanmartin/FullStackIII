// gestion-service/src/routes/gestionRoutes.js


// Rutas de data maestra para gestion-service
// Responsabilidad: exponer las tablas base que otros microservicios necesitan
// Endpoints disponibles:
// GET /api/productos   → lista todos los productos
// GET /api/sucursales  → lista todas las sucursales
// GET /api/empleados   → lista todos los empleados
// GET /api/terceros    → lista proveedores y clientes




const express=require('express');
const router=express.Router();

//Importa el controlador con la logica de cada entidad
const {
  getProductos,
  getSucursales,
  getEmpleados,
  getTerceros

} =require('../controllers/gestionController');

//Rutas de data maestra
//Cada ruta expone una tabla de la bbdd
router.get('/productos',getProductos);
router.get('/sucursales',getSucursales);
router.get('/empleados',getEmpleados);
router.get('/terceros',getTerceros);

module.exports=router;