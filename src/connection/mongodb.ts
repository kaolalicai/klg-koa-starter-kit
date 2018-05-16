import * as mongoose from 'mongoose'
import * as config from 'config'
import { logger } from '../lib/'

const mongodbConfig = config.get('database.mongodb')
const DEBUG_FLAG = config.get('database.mongooseDebug')
// mongoose.Promise.set(Promise)
mongoose.set('debug', DEBUG_FLAG)

let dbs: Map<string, mongoose.Connection> = new Map()

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

for (let c of mongodbConfig) {
  dbs.set(c.name, createConnection(c.url, c.options))
}

export default dbs
