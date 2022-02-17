const express = require('express');
const controladorCursos = require('../controllers/cursos.controller');
const api = express.Router();
const md_autenticacion = require('../middlewares/autenticacion')

api.get('/obtenerCursos', controladorCursos.obtenerCursos)
api.post('/agregarCursos/:idMaestro', md_autenticacion.Auth,controladorCursos.AgregarCursos);
api.put('/editarCursos/:idCurso', md_autenticacion.Auth, controladorCursos.EditarCursos)
module.exports = api;