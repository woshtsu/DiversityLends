import { Router } from 'express'
import { ControllerFA } from '../../Controllers/Controllers.js'

export const routerFA = Router()

// Get para generar la semilla de la base de datos
// DESARROLLO
routerFA.get('/initializeSeed', ControllerFA.generateSeed)

routerFA.get('/', (req, res) => {
  res.send('Bienvenido al api')
})

//EndPoint para obtener informacion de un usuario a traves de su correo como parametro
routerFA.get('/getuserdata/:correo', ControllerFA.getInfoUser)

// Get para obtener todos los posts 🙆‍♂️
routerFA.get('/getAllPosts', ControllerFA.getAllPosts)

// Get para obtener todas las especies 🙆‍♂️
routerFA.get('/getAllspecies', ControllerFA.getAllspecies)

// POST PARA VALIDAR EL INICIO DE SESION DE UN USUARIO 🙆‍♂️
routerFA.post('/validar', ControllerFA.validateLogin)

// POST PARA REALIZAR UN POSTEO
routerFA.post('/post', ControllerFA.postAvistamiento)

// Post para crear un usuario
routerFA.post('/create', ControllerFA.createUser)
// Post para crear un avistamiento

