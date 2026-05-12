// src/controllers/importController.js
// Controller que maneja DOS flujos de importación:
// 1. Automático (simulado) → usa ConnectorFactory de importService
// 2. Manual CSV (real)     → usa ProcesadorFactory + ImportacionRepository

const multer            = require('multer');
const csv               = require('csv-parser');
const fs                = require('fs');
const path              = require('path');
const importService     = require('../services/importService');
const ProcesadorFactory = require('../../procesadores/ProcesadorFactory');
const importacionRepo = require('../../repositories/ImportacionRepository');

// Configuración multer
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    const carpeta = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(carpeta)) fs.mkdirSync(carpeta, { recursive: true });
    cb(null, carpeta);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: almacenamiento,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos CSV'), false);
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }
});

const subirArchivo = upload.single('archivo');


// FLUJO 1: Importación automática (simulada)
// POST /api/import/datos

const importarDatos = async (req, res) => {
  try {
    const { sourceType, sucursal } = req.body;
    if (!sourceType) {
      return res.status(400).json({ success: false, error: 'Falta sourceType (ERP, CRM o POS)' });
    }

    // Usa ConnectorFactory simulado
    const resultado = await importService.importData(sourceType);

    // Registrar en historial
    await importacionRepo.registrarHistorial(
      sourceType, sucursal || 'general', resultado.totalRegistros || 0, 'completado'
    );

    res.status(200).json({ success: true, resultado });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// FLUJO 2: Importación manual CSV (real)
// POST /api/import/csv

const importarCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No se recibió archivo CSV' });
  }

  const rutaArchivo = req.file.path;
  const { modulo, fuente } = req.body;

  try {
    // Factory Method — crea el procesador con datos importados según módulo
    const procesador = ProcesadorFactory.crear(modulo);

    // Leer CSV
    const filas = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(rutaArchivo)
        .pipe(csv())
        .on('data', (fila) => filas.push(fila))
        .on('end', resolve)
        .on('error', reject);
    });

    // Procesador procesa y valida las filas
    const { registros, errores } = procesador.procesar(filas);

    if (registros.length === 0) {
      fs.unlinkSync(rutaArchivo);
      return res.status(400).json({ success: false, error: 'Sin registros válidos', errores });
    }

    // Repository Pattern — inserta en BD
    const insertados = await importacionRepo.insertarLote(
      procesador.tabla,
      procesador.columnas,
      registros
    );

    // Registrar en historial
    await importacionRepo.registrarHistorial(
      fuente || modulo, 'Todas', insertados, 'exitoso'
    );

    fs.unlinkSync(rutaArchivo);

    res.json({
      success:     true,
      modulo,
      tabla:       procesador.tabla,
      insertados,
      total_filas: registros.length,
      errores:     errores.length,
      mensaje:     `${insertados} registros importados en ${procesador.tabla}`
    });

  } catch (error) {
    if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
    console.error('Error importando CSV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/import/modulos
const listarModulos = (req, res) => {
  res.json({ success: true, modulos: ProcesadorFactory.modulosDisponibles() });
};

// GET /api/import/historial
const getHistorial = async (req, res) => {
  try {
    const historial = await importacionRepo.obtenerHistorial();
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/import/health
const health = (req, res) => {
  res.json({
    servicio:  'importacion-service',
    estado:    'ok',
    flujos:    ['automatico (ConnectorFactory)', 'manual CSV (ProcesadorFactory)'],
    timestamp: new Date().toISOString()
  });
};

module.exports = { importarCSV, subirArchivo, importarDatos, listarModulos, getHistorial, health };