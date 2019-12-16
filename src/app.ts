import {initMongoose} from '@akajs/mongoose'
import {Application} from '@akajs/web'

initMongoose()
const app: Application = new Application({})
export {app}
