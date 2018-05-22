import {database, lib, models} from '../modules'

const {logger} = lib
const db = database.dbs.get('db')

export function close (done) {
  db.close(done)
}

export async function drop () {
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].remove({})
  }
}

const fixtureStatus = new Map()

export async function initData (filePath) {
  const file = filePath.replace('test.ts', 'data.ts')
  if (fixtureStatus.has(file)) return
  logger.info('init test  ', file)
  await drop()
  await insertData(file)
  fixtureStatus.set(file, true)
}

async function insertData (filePath) {
  try {
    const data = await import(filePath)
    if (!data.length) return
    for (const d of data) {
      let model = d.model
      if (typeof d.model === 'string') {
        model = models[d.model]
        if (!model) throw new Error(' 不存在这个 Model ' + d.model)
      }
      await model.create(d.items)
    }
  } catch (err) {
    logger.info('init file fail ', filePath, err.message)
  }
}