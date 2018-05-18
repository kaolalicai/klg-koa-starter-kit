import {UserService} from '../service/UserService'
import {Context} from 'koa'

const userService = new UserService()

export class UserController {

  async register (ctx: Context) {
    ctx.body = await userService.register(ctx.request.body)
  }
}
