// importacion-service/src/app.js
// Punto de entrada del servicio de importación de datos

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const importRoutes = require('./src/routes/importRoutes');

// Cargamos las variables de entorno
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas del servicio de importación
app.use('/api/import', importRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Importacion service funcionando');
});

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Importacion service corriendo en puerto ${PORT}`);
});