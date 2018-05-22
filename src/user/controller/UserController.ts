import {UserService} from '../service/UserService'
import {Context} from 'koa'

const userService = new UserService()

export async function register (ctx: Context) {
  ctx.body = await userService.register(ctx.request.body)
}

export async function recharge (ctx: Context) {
  ctx.body = await userService.register(ctx.request.body)
}
