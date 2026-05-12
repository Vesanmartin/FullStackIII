// src/repositories/ImportacionRepository.js
// PATRÓN: Repository
// Separa toda la lógica de acceso a BD del resto del sistema.
// Si cambiamos de MySQL a otro motor, solo modificamos este archivo.

const conexion = require('../src/services/db');

class ImportacionRepository {

  // Insertar registros en lotes de 100
  async insertarLote(tabla, columnas, registros) {
    let insertados = 0;
    const tamanoLote = 100;

    for (let i = 0; i < registros.length; i += tamanoLote) {
      const lote = registros.slice(i, i + tamanoLote);
      const valores = lote.map(r => columnas.map(col => r[col] !== undefined ? r[col] : null));

      await new Promise((resolve, reject) => {
        const query = `INSERT INTO \`${tabla}\` (${columnas.map(c => `\`${c}\``).join(',')}) VALUES ?`;
        conexion.query(query, [valores], (err, result) => {
          if (err) reject(err);
          else { insertados += result.affectedRows; resolve(); }
        });
      });
    }
    return insertados;
  }

  // Registrar importación en historial
  async registrarHistorial(fuente, sucursal, registros, estado) {
    return new Promise((resolve, reject) => {
      conexion.query(
        'INSERT INTO importaciones (fuente, sucursal, registros, estado) VALUES (?, ?, ?, ?)',
        [fuente, sucursal, registros, estado],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  // Obtener historial completo
  async obtenerHistorial() {
    return new Promise((resolve, reject) => {
      conexion.query(
        'SELECT * FROM importaciones ORDER BY created_at DESC',
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  }
}

module.exports = new ImportacionRepository();