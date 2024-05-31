const {Router} = require('express')
const { createProyecto,
    getProyectos,
    updateProyecto} = require ('../controllers/proyectoController')

const router = Router()

//CREAR----------------------------
router.post('/', createProyecto)


//CONSULTAR TODOS------------------ 
router.get('/', getProyectos)

//update, actualizar
router.put('/:id', updateProyecto)

module.exports = router