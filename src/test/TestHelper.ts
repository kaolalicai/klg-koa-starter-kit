
import {logger} from '../lib'
import {initData} from './helper/database'

let filePath = ''
beforeAll(async function () {
  if (filePath) {
    await initData(filePath)
    filePath = ''
  }
  // TODO flush redis
})

afterAll(() => {
  logger.info(' 测试结束 cleanAll')
})

export function initFixuture (file) {
  filePath = file
}
