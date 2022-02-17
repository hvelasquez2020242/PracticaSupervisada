const express = require('express');
const controladorASignaciones = require('../controllers/asignaciones.controller');
const api = express.Router();
const md_autenticacion = require('../middlewares/autenticacion')

api.post('/agregarAsignaciones/:idCursoo', md_autenticacion.Auth,controladorASignaciones.AgregarAsignaciones);
api.get('/buscarAsignacionesPorAlumno', md_autenticacion.Auth, controladorASignaciones.BuscarAsignacionesPorAlumno );
api.get('/generarPdf', md_autenticacion.Auth, controladorASignaciones.GenerarPdf)

module.exports = api;

