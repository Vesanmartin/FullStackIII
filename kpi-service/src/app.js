// src/app.js
require('dotenv').config();

const express   = require('express');
const swaggerUi   = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const kpiRoutes = require('./routes/kpiRoutes');
const { iniciarConsumidor } = require('./events/consumidor');


const app  = express();
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3002;

app.use(express.json());

// Swagger — documentación visual
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/kpis', kpiRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: `Ruta ${req.method} ${req.path} no existe`
  });
});

app.listen(PORT, async () => {
  console.log(`KPI Service en http://localhost:${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
  await iniciarConsumidor();
});