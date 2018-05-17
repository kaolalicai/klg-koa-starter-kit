import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as morgan from 'koa-morgan'
import {router} from './router'

const app = new Koa()

// middleware
app.use(bodyParser())
app.use(morgan('tiny', {
  skip: function (req, res) {
    return /\/docs\//.exec(req.url) || /\/healthcheck\//.exec(req.url)
  }
}))

// routers
app.use(router.routes())
app.use(router.allowedMethods())

export {app}
