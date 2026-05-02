// Arreglo en memoria donde guardamos los datos (ej: proyectos)
let proyectos = [];

// 🔹 GET → obtener todos los proyectos
const getGestion = (req, res) => {
    // Devuelve todo el arreglo
    res.json(proyectos);
};

// 🔹 POST → crear un nuevo proyecto
const crearGestion = (req, res) => {
    const nuevo = req.body;      // Datos que llegan en el body (JSON)
    proyectos.push(nuevo);       // Se agrega al arreglo
    res.json({ mensaje: "Proyecto creado", nuevo });
};

// 🔹 PUT → actualizar un proyecto por id (posición en el arreglo)
const actualizarGestion = (req, res) => {
    const id = parseInt(req.params.id);  // id desde la URL

    // Si no existe ese índice, error 404
    if (!proyectos[id]) {
        return res.status(404).json({ mensaje: "No encontrado" });
    }

    // Reemplaza el contenido en esa posición
    proyectos[id] = req.body;

    res.json({ mensaje: "Proyecto actualizado" });
};

// 🔹 DELETE → eliminar un proyecto por id
const eliminarGestion = (req, res) => {
    const id = parseInt(req.params.id);

    // Si no existe, error 404
    if (!proyectos[id]) {
        return res.status(404).json({ mensaje: "No encontrado" });
    }

    // Elimina 1 elemento desde esa posición
    proyectos.splice(id, 1);

    res.json({ mensaje: "Proyecto eliminado" });
};

// Exporta las funciones para usarlas en las rutas
module.exports = {
    getGestion,
    crearGestion,
    actualizarGestion,
    eliminarGestion
};