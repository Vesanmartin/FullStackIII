const express = require('express');
const app = express();

const importRoutes = require('./src/routes/importRoutes');

app.use(express.json());

// Ruta base del microservicio
app.use('/api/import', importRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Import Service corriendo en puerto ${PORT}`);
});