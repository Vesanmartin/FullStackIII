// src/routes/bffRoutes.js


// RUTAS: BFF (Backend For Frontend)

// El BFF agrega llamadas a múltiples microservicios y devuelve
// exactamente lo que el frontend necesita en UNA sola llamada.


const express            = require('express');
const axios              = require('axios');
const adaptador          = require('../adapters/dashboardAdapter');
const enrutador          = express.Router();

const GATEWAY = process.env.API_GATEWAY_URL || 'http://localhost:3000';

// Helper para propagar el token del usuario
const encabezadoAuth = (req) => ({
  headers: {
    Authorization: req.headers['authorization'] || ''
  }
});


// Metodo GET /bff/dashboard 
// Agrega dashboard + circuitos en una sola respuesta para React
enrutador.get('/dashboard', async (req, res) => {
  try {
    // Llamada al gateway que enruta al informes-service
    const { data } = await axios.get(
      `${GATEWAY}/api/informes/dashboard`,
      encabezadoAuth(req)
    );

    // Adapter transforma los datos al formato que espera React
    const datosFormateados = adaptador.adaptarParaFrontend(data.informe);

    res.json({
      success:   true,
      dashboard: datosFormateados
    });

  } catch (error) {
    const estado = error.response?.status || 500;
    res.status(estado).json({
      success: false,
      error:   error.response?.data?.error || error.message
    });
  }
});


// Metodo POST /bff/chat 
// Para que el frontend use el chatbot sin conocer informes-service
enrutador.post('/chat', async (req, res) => {
  try {
    const { data } = await axios.post(
      `${GATEWAY}/api/informes/chat`,
      req.body,
      encabezadoAuth(req)
    );
    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error:   error.response?.data?.error || error.message
    });
  }
});


// Metodo POST /bff/kpis/:tipo 
// Para calcular KPIs sin que el frontend conozca kpi-service
enrutador.post('/kpis/:tipo', async (req, res) => {
  try {
    const { tipo } = req.params;
    const { data } = await axios.post(
      `${GATEWAY}/api/kpis/calculate/${tipo}`,
      req.body,
      encabezadoAuth(req)
    );
    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error:   error.response?.data?.error || error.message
    });
  }
});


// Metodo GET /bff/health 
enrutador.get('/health', async (req, res) => {
  let gatewayOk = false;
  try {
    await axios.get(`${GATEWAY}/health`, { timeout: 2000 });
    gatewayOk = true;
  } catch { /* gateway caído */ }

  res.json({
    servicio:  'Bff',
    estado:    'Ok',
    gateway:   gatewayOk ? 'alcanzable' : 'no-alcanzable',
    timestamp: new Date().toISOString()
  });
});


module.exports = enrutador;