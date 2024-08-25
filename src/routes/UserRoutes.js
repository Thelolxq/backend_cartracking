const express = require('express')
const routerUser = express.Router()
const users = require('../controller/UserController')
const gps = require('../controller/GpsController')
const protegerRutas = require('../middleware/ProtegerRutas')

    routerUser
            .get('/', (req,res)=> res.send('Bienvenidos a la api'))
            .get('/users', users.getUsers)
            .post('/register', users.registerUser)
            .post('/login', users.signInUsers)
            .post('/ubicacion', protegerRutas, gps.Ubicacion)
            .get('/ubicacion', gps.GetUbi)
    
    
module.exports = routerUser