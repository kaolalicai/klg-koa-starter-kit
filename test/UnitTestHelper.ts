import {lib} from './modules'
import {initData, remove} from './helper/database'

const {logger} = lib

let filePath = ''
beforeAll(async function () {
  console.log('filePath========', filePath)
  await remove()
  if (filePath) await initData(filePath)
})

afterAll(() => {
  logger.info(' 测试结束 cleanAll')
})

export function initFixuture (file) {
  filePath = file
}
