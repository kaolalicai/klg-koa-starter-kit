process.env.NODE_ENV = process.env.NODE_ENV || 'test'

import {initData} from './helper/database'
import {request} from './helper/request'
import {nock} from './helper/nock'

import {lib} from './modules'

const {logger} = lib

nock.register()

beforeAll(async function () {
  // await initData()
  // TODO flush redis
})

afterAll(async () => {
  // databaseHelpser.close()
  logger.info(' 测试结束 cleanAll nock')
  nock.cleanAll()
})

const prefix = '/api/v1'
export {request, nock, prefix}
