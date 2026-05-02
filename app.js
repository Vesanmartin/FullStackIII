// Importa Express (framework para crear el servidor)
const express = require('express');

// Crea la aplicación
const app = express();

// Importa las rutas de gestión
const gestionRoutes = require('./src/routes/gestionRoutes');

// Permite recibir datos en formato JSON
app.use(express.json());

// Ruta base para probar en el navegador
app.get('/', (req, res) => {
    res.send('Gestion Service funcionando');
});

// Usa las rutas bajo el prefijo /api
// Ej: /api/gestion
app.use('/api', gestionRoutes);

// Inicia el servidor en el puerto 3006
app.listen(3006, () => {
    console.log('Servidor corriendo en puerto 3006');
});