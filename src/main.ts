import * as config from 'config'
import {app} from './app'
import {logger} from './lib'

const time = Date.now()

const port = config.get('port')

app.listen(port, () => {
  logger.info(` app star in ${process.env.NODE_ENV || 'local'} env `)
  logger.info(` app star in ${(Date.now() - time) / 1000} s, listen on port ${port}`)
})

