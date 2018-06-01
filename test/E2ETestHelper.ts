console.log('current env', process.env.NODE_ENV)
process.env.NODE_ENV = 'test'
import * as config from 'config'
import {close, flushRedis, initData, remove} from './helper/database'
import {nock} from './helper/nock'
import {request} from './helper/request'

let filePath = ''
const prefix = '/api/v1'

nock.register()

const fixtureStatus = new Map()

before(async function () {
  await flushRedis()
})

beforeEach(async function () {
  const file = (this.currentTest as any).file
  if (fixtureStatus.has(file)) return
  console.log('currentTest file', file)
  await remove()
  await initData(filePath)
  fixtureStatus.set(file, true)
})

after((done) => {
  nock.cleanAll()
  close(done)
  console.info(' 测试结束 cleanAll nock')
})

export {request, nock, prefix}
