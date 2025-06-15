import { Request, Response } from 'express'
import { ModelFA } from '../Models/sqlite/Model.js'
// import { ModelFA } from '../Models/sqlserver/Model.js'
import { validatePartialUser, validateUser } from '../src/Utils/Schemas.js'

type Handler = (req: Request, res: Response) => void

export class ControllerFA {
  static getInfoUser: Handler = async (req, res) => {
    console.log(req.params.correo, typeof req.params)
    const result = await ModelFA.getInfoUser({ data: req.params })
    res.send(result)
  }
  static validateLogin: Handler = async (req, res) => {
    const filtro = await validatePartialUser({ input: req.body })
    if (!filtro.success) {
      return res.status(400).send("Error de Validacion")
    }
    const result = await ModelFA.validateLogin({ data: req.body })
    res.send(result)
  }
  static getAllspecies: Handler = async (req, res) => {
    const result = await ModelFA.getAllspecies()
    res.send(result)
  }
  static generateSeed: Handler = async (req, res) => {
    const result = await ModelFA.seedDB()
    res.send(result)
  }
  static getAllPosts: Handler = async (req, res) => {
    const result = await ModelFA.getAllPosts()
    res.send(result)
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
  static updateTables: Handler = async (req, res) => {
    const result = await ModelFA.updateTables()
    res.send(result)
  }
  static getUsers: Handler = async (req, res) => {
    const result = await ModelFA.getUsers()
    res.send(result)
  }
}