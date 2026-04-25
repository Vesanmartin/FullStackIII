// src/app.js
require('dotenv').config();

const express   = require('express');
const kpiRoutes = require('./routes/kpiRoutes');

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use('/api/kpis', kpiRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: `Ruta ${req.method} ${req.path} no existe`
  });
});

app.listen(PORT, () => {
  console.log(`\n KPI Service en http://localhost:${PORT}`);
  console.log(`  GET  /api/kpis/health`);
  console.log(`  GET  /api/kpis/tipos`);
  console.log(`  POST /api/kpis/calculate/sales`);
  console.log(`  POST /api/kpis/calculate/inventory`);
  console.log(`  POST /api/kpis/calculate/profitability`);
});