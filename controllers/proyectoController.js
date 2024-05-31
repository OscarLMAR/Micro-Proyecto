
//IMPORTAMOS LOS MODULOS//

const Proyecto = require ('../models/proyecto')
const { request, response } = require ('express')
const Cliente = require ('../models/cliente')
const TipoProyecto = require ('../models/tipoProyecto')
const Universidad = require ('../models/universidad')
const EtapaProyecto = require ('../models/etapaProyecto')

//FUNCION PARA VALIDAR LAS LLAVES FORANEAS//

const validarLlavesForaneas = async(data) =>{
    const {tipoProyecto, cliente, universidad, etapaProyecto} = data;

    //VERIFICAR QUE LAS LLAVES FORANEAS EXISTEN ANTES DE INTENTAR BUSCAR EN LA BASE DE DATOS//

    if(!tipoProyecto || !tipoProyecto._id) throw new Error('Tipo de proyecto no proporconado');
    if(!cliente || ! cliente._id) throw new Error('cliente no proporcionado');
    if(!universidad || !universidad._id) throw new Error('Universidad no proporcionada');
    if(!etapaProyecto || !etapaProyecto._id) throw Error('etapaProyecto no proporcionado');

    const [tipoProyectoBD, clienteBD, universidadBD, etapaProyectoBD] = await Promise.all([
        TipoProyecto.findById(tipoProyecto._id),
        Cliente.findById(cliente._id),
        Universidad.findById(universidad._id),
        EtapaProyecto.findById(etapaProyecto._id)
    ])

    return {
        tipoProyectovalido: !! tipoProyectoBD,
        clientevalido: !! clienteBD,
        universidadvalida: !! universidadBD,
        etapaProyectovalida: etapaProyectoBD
    }
}

//FUNCION CREAR PROYECTO//

const createProyecto = async (req = request, res = response) =>{
    try {
        
        const data = req.body
        const{
            tipoProyectovalido,
            clientevalido,
            universidadvalida,
            etapaProyectovalida
        } = await validarLlavesForaneas(data);

        if(!tipoProyectovalido){
            return res.status(400).json({ msg: 'Tipo de proyecto invalido'});
        }

        if(!clientevalido){
            return res.status(400).json({msg: 'Cliente invalido'})
        }

        if(!universidadvalida){
            return res.status(400).json({msg: 'Universidad invalida'})
        }

        if(!etapaProyectovalida){
            return res.status(400).json({msg: 'Etapa de proyecto invalido'})
        }

        const proyecto = new Proyecto(data);
        await proyecto.save()

        return res.status(201).json(proyecto)

    } catch (e) {
        return res.status(500).json({
            msj: 'error crearProyectos'+ e
        })
    }
}

//FUNCION OBTENER PROYECTOS//

const getProyectos = async (req = request, res = request) =>{
    try {
        const proyectos = await Proyecto.find()
        .populate({
            path: 'tipoProyecto'
        })
        .populate({
            path: 'cliente'
        })
        .populate({
            path: 'universidad'
        })
        .populate({
            path: 'etapaProyecto'
        })

    return res.json(proyectos)

    } catch (e) {
        return res.stale(500).json({
            msg: 'error getProyectos'+ e
        })
    }
}

//FUNCION ACTUALIZAR PROYECTOS//

const updateProyecto = async (req = request, res = response) =>{
    try {
        const id = req.params.id
        const data = req.body
    
        const {

            tipoProyectovalido,
            clientevalido,
            universidadvalida,
            etapaProyectovalida
        } = await validarLlavesForaneas(data);
    
        if(!tipoProyectovalido){
            return res.status(400).json({ msg: 'Tipo de proyecto invalido'});
        }
    
        if(!clientevalido){
            return res.status(400).json({msg: 'Cliente invalido'})
        }
    
        if(!universidadvalida){
            return res.status(400).json({msg: 'Universidad invalida'})
        }
    
        if(!etapaProyectovalida){
            return res.status(400).json({msg: 'Etapa de proyecto invalido'})
        }
    
        const proyecto = await Proyecto.findByIdAndUpdate(id, data, {new: true});
    
        return res.status(201).json(proyecto)
    } catch (e) {
        return res.status(500).json({
            msg: 'error ActualizarProyectos'+ e
        })
    }
}

module.exports = {
    createProyecto,
    getProyectos,
    updateProyecto
}