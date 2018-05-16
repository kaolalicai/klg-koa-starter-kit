export class UserController {
  hello (ctx) {
    const {userId} = ctx.params
    ctx.body = `hello ${userId}`
  }
}
