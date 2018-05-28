import {Context} from 'koa'

export async function buffer (ctx: Context) {
  ctx.body = 'hello world'
}

export async function mutex (ctx: Context) {
  ctx.body = 'hello world'
}
