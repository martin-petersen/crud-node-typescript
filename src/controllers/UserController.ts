import { Request, Response } from 'express'
import User from '../schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find()

      return res.json(users)
    } catch (erro) {
      res.json({
        message: 'sem dados'
      })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const user = await User.create(req.body)
    return res.json(user.fullName())
  }
}
export default new UserController()
