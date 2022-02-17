const express = require('express');
const app = express();
const cors = require('cors');


// IMPORTACION RUTAS
const usuariosRoutes = require('./src/routes/usuarios.routes');
const cursosRoutes = require('./src/routes/cursos.routes');
const asignacionesRoutes = require('./src/routes/asignaciones.routes')

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', usuariosRoutes, cursosRoutes, asignacionesRoutes);

module.exports = app;