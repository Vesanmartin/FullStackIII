// src/app.js
// API GATEWAY — Grupo Cordillera
// Punto de entrada único del sistema.

require('dotenv').config();

const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { limitadorGeneral, limitadorLogin } = require('./middleware/rateLimit');
const { verificarToken, verificarRol }     = require('./middleware/auth');

const aplicacion = express();
const PUERTO     = process.env.PORT || 3000;

// Middlewares globales
aplicacion.use(cors());
aplicacion.use(morgan('dev'));
aplicacion.use(express.json());
aplicacion.use(limitadorGeneral);

// Health check — va ANTES de los proxies
aplicacion.get('/health', (req, res) => {
  res.json({
    servicio:  'api-gateway',
    estado:    'ok',
    timestamp: new Date().toISOString(),
    uptime:    process.uptime()
  });
});

// Rutas PÚBLICAS
aplicacion.use('/api/auth/login',    limitadorLogin);
aplicacion.use('/api/auth/register', limitadorLogin);

aplicacion.use('/api/auth', createProxyMiddleware({
  target:       process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  changeOrigin: true
}));

// Rutas PROTEGIDAS
aplicacion.use('/api/kpis',
  verificarToken,
  createProxyMiddleware({
    target:       process.env.KPI_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true
  })
);

aplicacion.use('/api/gestion',
  verificarToken,
  createProxyMiddleware({
    target:       process.env.GESTION_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true
  })
);

aplicacion.use('/api/informes',
  verificarToken,
  verificarRol('admin', 'gerente'),
  createProxyMiddleware({
    target:       process.env.INFORMES_SERVICE_URL || 'http://localhost:3004',
    changeOrigin: true
  })
);

// Ruta no encontrada
aplicacion.use((req, res) => {
  res.status(404).json({
    error: `Ruta ${req.method} ${req.path} no existe`
  });
});

aplicacion.listen(PUERTO, () => {
  console.log(` API Gateway en http://localhost:${PUERTO}`);
  console.log(` POST /api/auth/login   : auth-service:3001  [público]`);
  console.log(`  *    /api/kpis/*      : kpi-service:3002   [auth]`);
  console.log(`  *    /api/gestion/*    : gestion-service:3003 [auth]`);
  console.log(`  *    /api/informes/*   : informes-service:3004 [auth+rol]`);
  console.log(`  GET  /health           : estado del gateway`);
});