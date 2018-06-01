import {lib} from './modules'
import {close, initData, remove} from './helper/database'

const {logger} = lib

let filePath = ''
before(async function () {
  console.log('filePath========', filePath)
  await remove()
  if (filePath) await initData(filePath)
})

after((done) => {
  close(done)
  logger.info(' 测试结束 cleanAll')
})

export function initFixuture (file) {
  filePath = file
}
