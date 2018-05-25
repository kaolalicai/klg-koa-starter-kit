import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as morgan from 'koa-morgan'
import * as serve from 'koa-static'
import 'reflect-metadata'
import {parameters, responseFormatter} from './common'
import {router} from './router'

const app = new Koa()

// middleware
app.use(bodyParser())
app.use(morgan('tiny', {
  skip: function (req, res) {
    return /\/docs\//.exec(req.url) || /\/healthcheck\//.exec(req.url)
  }
}))

// response format and  error handle
app.use(responseFormatter('^/api'))

// 将所有参数注册到 ctx.parameters
app.use(parameters)

// statics
app.use(serve('assets'))

// routers
app.use(router.routes())
app.use(router.allowedMethods())

export {app}
