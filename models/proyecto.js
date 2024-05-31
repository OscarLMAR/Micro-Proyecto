const {Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero:{
        type: String,
        requerid:[true, 'Numero requerido'],
        unique: [true]

    },
    titulo: {
        type: String,
        requerid:[true, 'Titulo requerido'],
        unique:[true]
    },
    fechaInicio: {
        type: Date,
        default: new Date
    },
    fechaEntrega: {
        type: String,
        requerid: [true, 'Fecha de entrega requerida']
    },
    valor: {
        type: String,
        unique:true
    },
    fechaCreacion: {
        type: Date,
        default: new Date
    },
    fechaActualizacion: {
        type: Date,
        default: new Date
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true]
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        
    },
    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        
    },
    etapaProyecto: {
        type: Schema.Types.ObjectId,
        ref:'EtapaProyecto',
        
    }
})

module.exports = model('Proyecto', ProyectoSchema)