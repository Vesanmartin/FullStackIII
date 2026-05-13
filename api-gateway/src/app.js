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
aplicacion.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
aplicacion.use(morgan('dev'));
aplicacion.use(limitadorGeneral);

// Health check — va ANTES de los proxies
aplicacion.get('/health', (req, res) => {
  res.json({
    servicio:  'Api-Gateway',
    estado:    'Ok',
    timestamp: new Date().toISOString(),
    uptime:    process.uptime()
  });
});

// Rutas PÚBLICAS
aplicacion.use('/api/auth/login',    limitadorLogin);
aplicacion.use('/api/auth/register', limitadorLogin);
aplicacion.use('/api/auth/verify-code', limitadorLogin);

aplicacion.use('/api/auth', createProxyMiddleware({
  target:       process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  changeOrigin: true,
  proxyTimeout: 10000,
  timeout:      10000,
  on: {
    error: (err, req, res) => {
      res.status(502).json({ error: 'Auth service no disponible' });
    }
  }
}));

// Rutas PROTEGIDAS
aplicacion.use('/api/kpis',
  verificarToken,
  verificarRol('gerente', 'supersaiyajin'),
  createProxyMiddleware({
    target: process.env.KPI_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'KPI service no disponible' });
      }
    }
  })
);


aplicacion.use('/api/gestion',
  verificarToken,
  verificarRol('admin', 'operador', 'supersaiyajin'),
  createProxyMiddleware({
    target: process.env.GESTION_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'Gestion service no disponible' });
      }
    }
  })
);


aplicacion.use('/api/informes',
  verificarToken,
  verificarRol('gerente', 'supersaiyajin'),
  createProxyMiddleware({
    target: process.env.INFORMES_SERVICE_URL || 'http://localhost:3004',
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'Informes service no disponible' });
      }
    }
  })
);

// Agregar ruta nueva
aplicacion.use('/api/importacion',
  verificarToken,
  verificarRol('operador', 'supersaiyajin'), // ← nueva
  createProxyMiddleware({
    target: process.env.IMPORTACION_SERVICE_URL || 'http://localhost:3005',
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'Importacion service no disponible' });
      }
    }
  })
);


// Alias /api/import → importacion-service
aplicacion.use('/api/import',
  verificarToken,
  verificarRol('operador', 'supersaiyajin'),
  createProxyMiddleware({
    target: process.env.IMPORTACION_SERVICE_URL || 'http://importacion-service:3003',
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: 'Importacion service no disponible' });
      }
    }
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
  console.log(` POST /api/auth/login        : auth-service:3001  [público]`);
  console.log(` POST /api/auth/verify-code  : auth-service:3001  [público]`);
  console.log(`  *    /api/kpis/*           : kpi-service:3002   [gerente, supersaiyajin]`);
  console.log(`  *    /api/gestion/*        : gestion-service:3003 [admin, operador, supersaiyajin]`);
  console.log(`  *    /api/informes/*       : informes-service:3004 [gerente, supersaiyajin]`);
  console.log(`  *    /api/importacion/*    : importacion-service:3005 [operador, supersaiyajin]`);
  console.log(`  *    /api/import/*         : importacion-service:3003 [operador, supersaiyajin]`);
  console.log(`  GET  /health               : estado del gateway`);

});