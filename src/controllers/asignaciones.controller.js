const Asignaciones = require('../models/asignaciones.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')
const PDF = require('pdfkit');
const fs = require('fs');

function AgregarAsignaciones(req, res){
    var idCursoo = req.params.idCursoo;
    var modeloAsignacion = new Asignaciones(); 

      Asignaciones.find({idAlumno: req.user.sub}, (err, alumnoEncontrado)=>{
          if(alumnoEncontrado.length >= 3){
              return res.status(500).send({mensaje: "Ya esta asignado a 3"})
          }else{
              
                Asignaciones.findOne({
                    idAlumno: req.user.sub,
                    idCurso: idCursoo
    

                  }, (err, cursoEncontrado)=>{

                    if(!cursoEncontrado){
                        modeloAsignacion.idAlumno = req.user.sub;
                        modeloAsignacion.idCurso = idCursoo;
                         modeloAsignacion.save((err, asignacionGuardada)=>{
        if(err) return res.status(500)
            .send({ mensaje : 'Error en la peticion' })
        if(!asignacionGuardada) return res.status(500)
            .send({ mensaje: 'Error al guardar el Usuario' })

        return res.status(200).send({ asignacion: asignacionGuardada})
    })
                    }else{
                        return res.status(500).send({mensaje: "Ya esta asignado a esta clase"})
                    }
                  }
                  )
              
             
          }
      })
         
        
       
    
}
function BuscarAsignacionesPorAlumno(req, res){
    Asignaciones.find({idAlumno: req.user.sub}, (err, asignacionesEncontrados)=>{

        return res.status(500).send({ asignaciones: asignacionesEncontrados })
    })
}
function GenerarPdf(req, res){
    Asignaciones.find({idAlumno: req.user.sub}, (err, asignacionesEncontrados)=>{

        const doc = new PDF();
        doc.text(asignacionesEncontrados, {
            align: 'center'
        });
            doc.pipe(fs.createWriteStream(__dirname + 'Ejemplo.pdf'));
    
       doc.end();
        console.log('pdf generado');
    })
    
    
}

module.exports = {
    AgregarAsignaciones,
    BuscarAsignacionesPorAlumno,
    GenerarPdf
    }

   