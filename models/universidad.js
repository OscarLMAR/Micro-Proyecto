const {Schema, model} = require('mongoose')

const UniversidadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        unique: true
    },
    ubicacion: {
        type: String,
        required: [true, 'Ubicacion requerida'],
        unique: true
    },
    telefono :{
        type: Number,
        unique: [true]
    },
    fechaCreacion :{
        type: Date,
        default: new Date()
    },
    fechaActualizacion : {
        type: Date,
        default : new Date()
    }
})

module.exports = model('Universidad', UniversidadSchema)