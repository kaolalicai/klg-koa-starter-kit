import {initMongoose} from '@akajs/mongoose'
import {Application} from '@akajs/core'
import './ioc.config'

initMongoose()
const app: Application = new Application({})
export {app}
