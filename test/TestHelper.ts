import {close, initData} from './helper/database'
import {nock} from './helper/nock'
import {request} from './helper/request'

import {lib} from './modules'

const {logger} = lib

nock.register()

beforeEach(async function () {
  await initData(this.currentTest.file)
  // TODO flush redis
})

after((done) => {
  // databaseHelpser.close()
  logger.info(' 测试结束 cleanAll nock')
  nock.cleanAll()
  close(done)
})

const prefix = '/api/v1'
export {request, nock, prefix}
