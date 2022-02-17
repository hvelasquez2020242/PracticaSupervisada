const Usuarios = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')
const PDF = require('pdfkit');
const fs = require('fs');

function RegistrarAlumno(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuarios();

    if(parametros.nombre && parametros.apellido && parametros.email
        && parametros.password) {
            Usuarios.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.apellido = parametros.apellido;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.direccion = parametros.direccion;
                    modeloUsuario.rol = 'ALUMNO';
                    

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}
function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuarios();

    if(parametros.nombre && parametros.apellido && parametros.email
        && parametros.password) {
            Usuarios.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.apellido = parametros.apellido;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.direccion = parametros.direccion;
                    modeloUsuario.rol = 'MAESTRO';
                    

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}
function EditarAlumno(req, res){
    var idAlumno = req.params.idAlumno;
    var parametros = req.body; 

    //borrar la propiedad de password en el body
    delete parametros.password;

    if(req.user.sub !== idAlumno) {
        return res.status(500).send({mensaje: 'No tiene los permisos para editar este usuario'})
    }
    Usuarios.findByIdAndUpdate(req.user.sub, parametros, {new: true}, (err, usuarioEditado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if(!usuarioEditado) return res.status(500).send({mensaje: 'Error al editar usuario'});
        return res.status(200).send({usuario: usuarioEditado});
    })
}
function RegistrarMaestroPorDefecto(req, res) {
    var modeloUsuario = new Usuarios();

                

                
                    modeloUsuario.nombre = "Juan";
                    modeloUsuario.apellido = "juan";
                    modeloUsuario.email = "MAESTRO";
                    modeloUsuario.direccion = "20 calle";
                    modeloUsuario.rol = 'MAESTRO';
                    

                    bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                
            
  

}
function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    Usuarios.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ token: jwt.crearToken(usuarioEncontrado)})
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}
function eliminarUsuario(req,res){
    var idUsuario = req.params.idUsuario;

    if(idUsuario !== req.user.sub){
        return res.status(500).send({mensaje: "No puede eliminar otro usuario"})

    }else{
        Usuarios.findByIdAndDelete(idUsuario, (err, usuarioEliminado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!usuarioEliminado) return res.status(500)
                .send({ mensaje: 'Error al eliminar usuario' })
    
            return res.status(200).send({ usuario: usuarioEliminado});
        })
    }
  
}
module.exports = {
    RegistrarAlumno,
    RegistrarMaestro,
    EditarAlumno,
    Login,
    eliminarUsuario,
    RegistrarMaestroPorDefecto

}