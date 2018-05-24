import {models} from '../Models'
import {lib} from '../modules'

const {logger} = lib
const collections = []

/**
 * todo 改成 npm module
 */
export async function initData (filePath) {
  const file = filePath.replace('spec.ts', 'data.ts').replace('test.ts', 'data.ts')
  logger.info('init test  data', file)
  await remove()
  await insertData(file)
}

export async function remove () {
  for (let model of Object.values(models)) {
    await (model as any).remove({})
  }
}

async function insertData (filePath) {
  try {
    const data = await import(filePath)
    if (!data.length) return
    for (const d of data) {
      let model = models[d.model]
      if (!model) throw new Error(' 不存在这个 Model ' + d.model)
      await model.create(d.items)
      collections.push(d.model)
    }
  } catch (err) {
    logger.info('init file fail ', filePath, err.message)
  }
}
