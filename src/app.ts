import {MongoModelBuilder} from '@akajs/mongoose'
import {Application} from '@akajs/core'
// 必须导入，注意顺序，后期考虑自动化引入方案
import './model'
new MongoModelBuilder().build()
import './ioc.config'
import './controller'

const app: Application = new Application({})
export {app}
