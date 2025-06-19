import { Request, Response } from 'express'
import { ModelFA } from '../Models/sqlite/Model.js'
// import { ModelFA } from '../Models/sqlserver/Model.js'
import { TypeResponseGetUsuario, correoSchema, validatePartialUser, validateUser } from '../src/Utils/Schemas.js'

type Handler = (req: Request, res: Response) => void

export class ControllerFA {

  // GET Controlador para comunicacion de Informacion de Usuario🙆‍♂️
  static getInfoUser: Handler = async (req, res) => {
    const correoValidado = correoSchema.safeParse(req.params.correo)

    if(!correoValidado.success){
      return res.json({errorMensaje: "Error en el formato del correo"})
    }
    try {
      const usuario = await ModelFA.getInfoUser({ data: correoValidado.data as string})
      const { contraseña,...dataSegura} = usuario
      res.json(dataSegura)
    } catch (error) {
      res.json({errorMensaje: "Usuario no encontrado"})
    }
  }

  // GET Controlador para obtener las especies🙆‍♂️
  static getAllspecies: Handler = async (req, res) => {
    const especies = await ModelFA.getAllspecies()
    const data = especies.map(({ especie_id, categoria_id, ...rest }) => rest)
    res.json(data)
  }
  
  // POST PARA VALIDAR USUARIOS RESPONDE TRUE SI EL USUARIO ESTA VALIDADO🙆‍♂️
  static validateLogin: Handler = async (req, res) => {
    const filtro = await validatePartialUser({ input: req.body })
    if (!filtro.success) {
      return res.status(400).json({errorMensaje:"Error en las credenciales"})
    }
    const result = await ModelFA.validateLogin({ data: req.body })
    res.json({esUsuario: result!=undefined? true: false})
  }

  // GET PARA OBTENER TODOS LOS POST 🙆‍♂️
  static getAllPosts: Handler = async (req, res) => {
    const posts = await ModelFA.getAllPosts()
    if (posts && Object.keys(posts).length === 0) {
      return res.status(404).json({errorMensaje:"No hay post"})
    }
    res.json(posts)
  }

  static createUser: Handler = async (req, res) => {
    const result = await validateUser({ input: req.body })
    if (!result.success) {
      return res.status(400).json({ error: "Datos invalidos revice el formato" })
    }
    const newUser = await ModelFA.createUser({ data: result.data! })
    res.json({ message: newUser })
  }

  static postAvistamiento: Handler = async (req, res) => {
    const result = await ModelFA.postAvistamiento(req.body)
    res.send(result)
  }

  static generateSeed: Handler = async (req, res) => {
    const result = await ModelFA.seedDB()
    res.send(result)
  }

}