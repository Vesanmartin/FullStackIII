// src/controllers/kpiController.js
//Controlador: Acá es recibir el request HTTP, llamar al patron correcto y devolver respuesta.
// Coordina, no tiene lógica del negocio.

const FabricaKPI = require('../patterns/kpiFactory');

//POST /api/kpis/calculate/:type
const calcular = async (req, res) => {

    try {
        // req.params : variables que vienen de la URL
        // EJ_ /calculate/ventas ->type = 'ventas'
        const { type } = req.params;
        //req.body-> json que envio cliente
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({
                error: 'Falta cambo "fecha" en el body'

            });
        }

        // Factory method: fabrica de crear calculator segun tipo
        const calculador = FabricaKPI.crear(type);
        const resultado = calculador.calculate(data);

        res.json({
            success: true,
            timestamp: new Date().toISOString(),
            kpi: resultado
        });
    } catch (err) {
        const status = err.message.includes('no existe') ? 400 : 500;
        res.status(status).json({ success: false, error: err.message });
    }
};

// get /api/kpis /tipos

const obtenerTipos = (req, res) => {
    res.json({
        tipos: FabricaKPI.getTiposDisponibles()
    });
};

module.exports = { calcular, obtenerTipos };