
export class DemoController {
  hello (ctx) {
    const {name} = ctx.params
    ctx.body = `hello ${name}`
  }
}
