import {UserService} from '../service/UserService'
import {Context} from 'koa'

const userService = new UserService()

export class UserController {

  register (ctx: Context) {
    ctx.body = userService.register(ctx.request.body)
  }
}
