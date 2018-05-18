process.env.NODE_ENV = process.env.NODE_ENV || 'test'

import {initData, close} from './helper/database'
import {request} from './helper/request'
import {nock} from './helper/nock'

import {lib} from './modules'

const {logger} = lib

nock.register()

beforeAll(async function () {
  // await initData()
  // TODO flush redis
})

afterAll((done) => {
  // databaseHelpser.close()
  logger.info(' 测试结束 cleanAll nock')
  nock.cleanAll()
  close(done)
})

const prefix = '/api/v1'
export {request, nock, prefix}
