// src/app.js

// PUNTO DE ENTRADA — informes-service
// Configura Express, registra middlewares y rutas,
// y arranca el servidor en el puerto definido en .env


require('dotenv').config(); // carga variables del archivo .env

const express = require('express');
const informeRoutes = require('./routes/informeRoutes');

const app = express();
const PORT = process.env.PORT || 3004;

// Permite que Express entienda JSON en el body
app.use(express.json());

// Todas las rutas quedan bajo /api/informes
app.use('/api/informes', informeRoutes);

// Si ninguna ruta coincidió
app.use((req, res) => {
    res.status(404).json({
        error: `La ruta ${req.method} ${req.path} no existe`
    });
});

app.listen(PORT, () => {
    console.log(`\Informes Service en http://localhost:${PORT}`);
    console.log(`  GET  /api/informes/health`);
    console.log(`  GET  /api/informes/dashboard`);
    console.log(`  GET  /api/informes/circuitos`);
});