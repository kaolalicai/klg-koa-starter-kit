import * as Koa from 'koa'
import * as config from 'config'
import * as bodyParser from 'koa-bodyparser'
import * as morgan from 'koa-morgan'
import {logger} from './lib/Logger'

const time = Date.now()
const app = new Koa()

// middleware
app.use(bodyParser())
app.use(morgan('tiny', {
  skip: function (req, res) {
    return /\/docs\//.exec(req.url) || /\/healthcheck\//.exec(req.url)
  }
}))

// routers
const router = require('./app/router')
app.use(router.routes())
app.use(router.allowedMethods())

const port = config.get('port')

app.listen(port)

logger.info(` app star in ${process.env.NODE_ENV} env `)
logger.info(` app star in ${(Date.now() - time) / 1000} s, listen on port ${port}`)