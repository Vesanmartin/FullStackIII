// src/services/contextoService.js
// Obtiene resumen de datos reales desde la BD grupocordillera
// para pasárselo como contexto a Ollama antes de responder.

const conexion = require('../config/database');

class ContextoService {

  async obtenerContexto(filtros = {}) {
  try {
    const { año, mes_inicio, mes_fin } = filtros;

    const [resumenERP, topProductos, porSucursal, ventasPOS, ultimasImportaciones, comprasERP] = await Promise.all([
      this._resumenVentasERP(año, mes_inicio, mes_fin),
      this._topProductos(año, mes_inicio, mes_fin),
      this._ventasPorSucursalERP(año, mes_inicio, mes_fin),
      this._resumenVentasPOS(año, mes_inicio, mes_fin),
      this._ultimasImportaciones(),
      this._resumenComprasERP(año, mes_inicio, mes_fin)
    ]);

    return {
      ventas_erp:            resumenERP,
      top_productos:         topProductos,
      ventas_por_sucursal:   porSucursal,
      ventas_pos:            ventasPOS,
      ultimas_importaciones: ultimasImportaciones,
      compras_erp:           comprasERP,
      filtros_aplicados:     filtros
    };

  } catch (error) {
    console.error('Error obteniendo contexto:', error.message);
    return {};
  }
}


  // Resumen de ventas ERP agrupado por mes
  _resumenVentasERP(año, mes_inicio, mes_fin) {
  // Construimos el "WHERE" dinámico según los filtros recibidos
  const condiciones = ["tipo = 'venta'"];
  const valores = [];

  if (año) {
    condiciones.push('año = ?');
    valores.push(parseInt(año));
  }
  if (mes_inicio) {
    condiciones.push('mes >= ?');
    valores.push(parseInt(mes_inicio));
  }
  if (mes_fin) {
    condiciones.push('mes <= ?');
    valores.push(parseInt(mes_fin));
  }

  const where = condiciones.join(' AND ');

  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT año, mes,
              COUNT(*)      AS cantidad_transacciones,
              SUM(total)    AS total_ventas,
              SUM(cantidad) AS unidades_vendidas
       FROM transacciones_erp
       WHERE ${where}
       GROUP BY año, mes
       ORDER BY año DESC, mes DESC
       LIMIT 24`,
      valores,
      (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados);
      }
    );
  });
}

  // Top 5 productos más vendidos por total generado
  _topProductos(año, mes_inicio, mes_fin) {
  const condiciones = ["tipo = 'venta'"];
  const valores = [];

  if (año) { condiciones.push('año = ?'); valores.push(parseInt(año)); }
  if (mes_inicio) { condiciones.push('mes >= ?'); valores.push(parseInt(mes_inicio)); }
  if (mes_fin) { condiciones.push('mes <= ?'); valores.push(parseInt(mes_fin)); }

  const where = condiciones.join(' AND ');

  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT nombre_producto,
              SUM(cantidad) AS unidades_vendidas,
              SUM(total)    AS total_generado
       FROM transacciones_erp
       WHERE ${where}
       GROUP BY nombre_producto
       ORDER BY total_generado DESC
       LIMIT 5`,
      valores,
      (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados);
      }
    );
  });
}
  // Ventas ERP por sucursal
  _ventasPorSucursalERP(año, mes_inicio, mes_fin) {
  const condiciones = ["tipo = 'venta'"];
  const valores = [];

  if (año) { condiciones.push('año = ?'); valores.push(parseInt(año)); }
  if (mes_inicio) { condiciones.push('mes >= ?'); valores.push(parseInt(mes_inicio)); }
  if (mes_fin) { condiciones.push('mes <= ?'); valores.push(parseInt(mes_fin)); }

  const where = condiciones.join(' AND ');

  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT sucursal,
              COUNT(*)   AS transacciones,
              SUM(total) AS total_ventas
       FROM transacciones_erp
       WHERE ${where}
       GROUP BY sucursal
       ORDER BY total_ventas DESC`,
      valores,
      (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados);
      }
    );
  });
}

  // Resumen ventas POS por sucursal (puede estar vacía, no falla)
  _resumenVentasPOS(año, mes_inicio, mes_fin) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT sucursal,
              COUNT(*)   AS cantidad_boletas,
              SUM(total) AS total_ventas
       FROM ventas_pos
       GROUP BY sucursal
       ORDER BY total_ventas DESC`,
      [],
      (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados);
      }
    );
  });
}

// Resumen de compras ERP por mes
_resumenComprasERP(año, mes_inicio, mes_fin) {
  const condiciones = ["tipo = 'compra'"];
  const valores = [];

  if (año) { condiciones.push('año = ?'); valores.push(parseInt(año)); }
  if (mes_inicio) { condiciones.push('mes >= ?'); valores.push(parseInt(mes_inicio)); }
  if (mes_fin) { condiciones.push('mes <= ?'); valores.push(parseInt(mes_fin)); }

  const where = condiciones.join(' AND ');

  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT año, mes,
              COUNT(*)      AS cantidad_transacciones,
              SUM(total)    AS total_compras
       FROM transacciones_erp
       WHERE ${where}
       GROUP BY año, mes
       ORDER BY año DESC, mes DESC
       LIMIT 24`,
      valores,
      (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados);
      }
    );
  });
}

  // Últimas 5 importaciones registradas
  _ultimasImportaciones() {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT fuente, sucursal, registros, estado, created_at
         FROM importaciones
         ORDER BY created_at DESC
         LIMIT 5`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  }
}


module.exports = new ContextoService();