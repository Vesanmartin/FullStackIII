// Middleware para validar datos antes de que lleguen al controller
// Se usa en rutas como POST y PUT

const validarGestion = (req, res, next) => {

    // Extrae el campo "nombre" desde el body
    const { nombre } = req.body;

    // 🔹 Validación 1: campo obligatorio
    // Si no viene el nombre, se detiene el flujo y responde error
    if (!nombre) {
        return res.status(400).json({
            mensaje: "El campo nombre es obligatorio"
        });
    }

    // 🔹 Validación 2: tipo de dato
    // Verifica que el nombre sea texto
    if (typeof nombre !== 'string') {
        return res.status(400).json({
            mensaje: "El nombre debe ser texto"
        });
    }

    // 🔹 Validación 3: largo mínimo
    // Evita nombres muy cortos (ej: "a")
    if (nombre.length < 3) {
        return res.status(400).json({
            mensaje: "El nombre debe tener al menos 3 caracteres"
        });
    }

    // 🔹 Si todo está correcto
    // Permite que la petición continúe hacia el controller
    next();
};

// Exporta el middleware para usarlo en las rutas
module.exports = validarGestion;



//Revisa los datos antes de entrar al controller
//Si hay error → responde y corta
//Si todo está bien → pasa al controller