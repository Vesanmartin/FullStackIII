// src/app.js

// PUNTO DE ENTRADA — informes-service
// Configura Express, registra middlewares y rutas, y sswager.
// y arranca el servidor en el puerto definido en .env
// Se agrega función de chatbot usando Ollama (llama3.2) para responder preguntas sobre los datos del negocio.

require('dotenv').config(); // carga variables del archivo .env

const express = require('express');
const swaggerUi     = require('swagger-ui-express');
const swaggerSpec   = require('./config/swagger');
const informeRoutes = require('./routes/informeRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const { publicarDatosImportados } = require('./events/publicador');

const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3004;

// Permite que Express entienda JSON en el body
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Todas las rutas quedan bajo /api/informes y despues de declarar swagger para que no interiera con la documentacion de swagger
app.use('/api/informes', informeRoutes);


// Rutas del chatbot
app.use('/api/informes', chatbotRoutes);


// Si ninguna ruta coincidió
app.use((req, res) => {
    res.status(404).json({
        error: `La ruta ${req.method} ${req.path} no existe`
    });
});

app.listen(PORT, async () => {
    console.log(`Informes Service en http://localhost:${PORT}`);
    console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
    console.log(`Chatbot en POST http://localhost:${PORT}/api/informes/chat`);

// Publicar evento de prueba al arrancar 👈 agregar
    await publicarDatosImportados({
        sucursal:  'Santiago Centro',
        tipo:      'ventas',
        registros: 150,
        periodo:   new Date().toISOString()
    });


});
