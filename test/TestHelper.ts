process.env.NODE_ENV = 'e2e'

import {nock} from './helper/nock'
import {request} from './helper/request'

import {database, lib, test} from './modules'

const {logger} = lib
let filePath = ''
const prefix = '/api/v1'

nock.register()

beforeAll(async function () {
  console.log('filePath', filePath)
  await test.initData(filePath)
})

afterAll((done) => {
  nock.cleanAll()
  done()
  // database.mongodb.dbs.get('db').close()
})

export {request, nock, prefix}

export function initFixuture (file) {
  filePath = file
}
