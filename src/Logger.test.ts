import {Logger} from './Logger'

describe('logger ts test', async function () {

  it(' test ts log', async () => {
    const logger = new Logger({
      level: 'log',
      stackIndex: 1,
      transport: function (data) {
        // console.log('data', data);
        expect(data)
        expect(data.level).toEqual(0)
      }
    })
    logger.log('hello world')
  })

  it(' test info', async () => {
    const logger = new Logger()
    logger.info('hello world')
  })

  it(' test debug', async () => {
    const logger = new Logger()
    logger.debug('hello world')
  })

  it(' test warn', async () => {
    const logger = new Logger({
      transport: function (data) {
        expect(data.level).toEqual(4)
        expect(data.title).toEqual('warn')
        expect(data.message).toEqual('hello world')
        expect(data.path.includes('Logger.test.ts'))
      }
    })
    logger.warn('hello world')
  })

  it(' test err', async () => {
    const logger = new Logger()
    logger.error('hello world')
  })
})
