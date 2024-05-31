const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const {mongoConn} = require('./databases/configuracion')
const cors = require('cors')

app.use(cors({
    origin:'*'
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoConn ()

const proyectos = require('./routes/proyectoRoutes')

app.use('/api/v1/proyectos', proyectos)

app.get("*", (req, res) => {
    return res.status(404).json({
        msj:'No encontrado',
        status:404
    })

})
module.exports = app