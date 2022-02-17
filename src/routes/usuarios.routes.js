const express = require('express');
const controladorUsuario = require('../controllers/usuarios.controller');

const md_autenticacion = require('../middlewares/autenticacion')
const api = express.Router();
api.post('/registrar',controladorUsuario.RegistrarAlumno);
api.post('/registrarMaestro',controladorUsuario.RegistrarMaestro);
api.put('/editarAlumno/:idAlumno', md_autenticacion.Auth,controladorUsuario.EditarAlumno);
api.post('/login', controladorUsuario.Login);
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuario.eliminarUsuario)
api.post('/agregarMaestroPorDefecto', controladorUsuario.RegistrarMaestroPorDefecto);
module.exports = api;