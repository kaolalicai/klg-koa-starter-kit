import {lib, models, database} from '../modules'

const {logger} = lib
const db = database.dbs.get('db')

export async function close (done) {
  db.close(done)
}

export async function drop () {
  for (let key of Object.keys(db.collections)) {
    await db.collections[key].remove({})
  }
}

export async function initData (fileName) {
  logger.info('init test  fixtures ', fileName)
  // try {
  //   const data = require(fileName)
  //   if (!data.length) return
  //   for (const d of data) {
  //     let model = d.model
  //     if (typeof d.model === 'string') {
  //       model = models[d.model]
  //       if (!model) throw new Error(' 不存在这个 Model ' + d.model)
  //     }
  //     await model.create(d.items)
  //   }
  // } catch (err) {
  //   logger.info('init file fail ', fileName, err.errors)
  //   logger.info('init file fail ', fileName, err.stack)
  // }
}
