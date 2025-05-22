import { Router } from 'express'
import { ControllerFA } from '../../Controllers/Controllers.js'

export const routerFA = Router()

routerFA.get('/', (req, res) => {
  res.send('Bienvenido al api')
})
// Get para generar la semilla de la base de datos
routerFA.get('/initializeSeed', ControllerFA.generateSeed)
// Get para obtener todos los posts
routerFA.get('/getAllPosts', ControllerFA.getAllPosts)

routerFA.get('/getUsers', ControllerFA.getUsers)

routerFA.get('/getAllspecies', ControllerFA.getAllspecies)

// Post para crear un usuario
routerFA.post('/create', ControllerFA.createUser)
// Post para crear un avistamiento
routerFA.post('/post', ControllerFA.postAvistamiento)

// Get para actualizar tablas de la base de datos
routerFA.get('/updateTables', ControllerFA.updateTables)
/*
  Falta añadir la insercion de categorias en la base de datos
  falta actualizar los posts
  Faltan varias cosas para checar
*/