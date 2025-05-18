import { Request, Response } from 'express'
import { ModelFA } from '../Models/sqlite/Model.js'
import { validateUser } from '../src/Utils/Schemas.js'

type Handler = (req: Request, res: Response) => void

export class ControllerFA {
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
}