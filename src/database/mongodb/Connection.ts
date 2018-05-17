import * as config from 'config'
import {logger} from '../../lib/Logger'
import * as mongoose from 'mongoose'
import {Document, Model} from 'mongoose'

(mongoose as any).Promise = Promise
const DEBUG_FLAG = config.get('database.mongoDebug')
mongoose.set('debug', DEBUG_FLAG)

function createConnection (url, options = {}) {
  const db = mongoose.createConnection(url, options)
  db.on('error', err => {
    err.message = `[mongoose]${err.message}`
    logger.error(err)
  })

  db.on('disconnected', () => {
    logger.error(`[mongoose] ${url} disconnected`)
  })

  db.on('connected', () => {
    logger.info(`[mongoose] ${url} connected successfully`)
  })

  db.on('reconnected', () => {
    logger.info(`[mongoose] ${url} reconnected successfully`)
  })
  return db
}

let dbs: Map<string, mongoose.Connection> = new Map()
const mongoConfigs = config.get('database.mongodb')
for (let c of mongoConfigs) {
  dbs.set(c.name, createConnection(c.url, c.options))
}

export {dbs}
