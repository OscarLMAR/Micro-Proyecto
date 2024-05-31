
const mongoose = require('mongoose')

const mongoConn = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {

        })
        console.log('Conexion exitosa a mongo')
    } catch (error) {
        console.log('Error', e)
        throw new Error('Error al conectar a mongo')


    }

}

module.exports = {mongoConn}