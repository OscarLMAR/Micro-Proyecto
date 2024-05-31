const{Schema, model} = require('mongoose')

const EtapasSchema = Schema({
    nombre: {
        type: String,
        requerid:[true, 'Nombre requerido'],
        unique:[true]
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('EtapaProyecto', EtapasSchema)