import {Context} from 'koa'
import {UserService} from '../service/UserService'

const userService = new UserService()

export async function register (ctx: Context) {
  ctx.body = await userService.register.process(ctx.parameters)
}

export async function recharge (ctx: Context) {
  Object.assign(ctx.parameters, ctx.params)
  ctx.body = await userService.recharge.process(ctx.parameters)
}
