const Cursos = require('../models/cursos.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')
const PDF = require('pdfkit');
const fs = require('fs');

function obtenerCursos(req, res){
    Cursos.find({idMaestro: req.user.sub}, (err, cursosEncontrados)=>{

        return res.send({cursos: cursosEncontrados})
    })
}

function AgregarCursos(req, res) {
    var idMaestro = req.params.idMaestro;
    var parametros = req.body;
    var modeloCursos = new Cursos();

    if(req.user.sub !== idMaestro) {
        return res.status(500).send({mensaje: 'No tiene los permisos para agregar cursos este usuario'})
    }else{

        if( parametros.nombre){
            modeloCursos.nombre = parametros.nombre;
            modeloCursos.descripcion = parametros.descripcion;
            modeloCursos.idMaestro = req.user.sub;
           
    
            modeloCursos.save((err, productoGuardado)=>{
    
                return res.send({ productos: productoGuardado});
            });
        } else {
            return res.send({ mensaje: "Debe enviar los parametros obligatorios."})
        }
    }
}
function EditarCursos(req, res) {

    const idCurso = req.params.idCurso;
    const parametros = req.body;

    Cursos.find({idMaestro: req.user.sub}, (err, cursosEncontrados)=>{

        if(cursosEncontrados){
               Cursos.findByIdAndUpdate(idCurso, parametros, { new : true } ,(err, cursoEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!cursoEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Producto' });

        return res.status(200).send({ curso: cursoEditado});
    })
        }else{
            return res.status(500).send({mensaje: "No puede editar un curso que no le pertenece"})
        }

        
    })
    

 
}



module.exports = {
    obtenerCursos,
    AgregarCursos,
    EditarCursos

    }