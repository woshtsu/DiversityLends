import { Request, Response } from 'express'
import { ModelFA } from '../Models/sqlite/Model.js'
import { validateUser } from '../src/Utils/Schemas.js'

type Handler = (req: Request, res: Response) => Promise<void> | void

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
    const result = validateUser(req.body)

    const newUser = await ModelFA.createUser({ data: result })
    res.send(newUser)
  }

  static postAvistamiento: Handler = async (req, res) => {
    const result = await ModelFA.postAvistamiento(req.body)
    res.send(result)
  }
}