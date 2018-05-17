export * from './demo/model'
// app
export * from './app'

// model
import * as demoModel from './demo/model'

const models = {}
Object.assign(models, demoModel)
export {models}

// lib
import * as lib from './lib'

export {lib}

// database
import * as database from './database'

export {database}
