import {nock} from './helper/nock'
import {request} from './helper/request'
import {initData, remove} from './helper/database'

process.env.NODE_ENV = 'e2e'

let filePath = ''
const prefix = '/api/v1'

nock.register()

beforeAll(async function () {
  await remove()
  if (filePath) await initData(filePath)
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
