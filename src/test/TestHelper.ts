import {logger} from '../lib'
import {initData} from './helper/database'

let filePath = ''
beforeAll(async function () {
  console.log('filePath', filePath)
  await initData(filePath)
  // TODO flush redis
})

afterAll(() => {
  logger.info(' 测试结束 cleanAll nock')
})

export function initFixuture (file) {
  filePath = file
}
