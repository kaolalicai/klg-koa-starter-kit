import {Connection, Document, Model} from 'mongoose'
import * as MockMongoServer from 'mongodb-mock-server'

/**
 * todo 改成 npm module
 */
export class TestHelper {
  static close () {
    MockMongoServer.cleanup()
  }

  static async initMockDbConnection () {

    return new Promise<Connection>((resolve, reject) => {
      MockMongoServer.createServer(40003).then(server => {
        server.setMessageHandler(request => {
          const doc = request.document
          if (doc.ismaster) {
            request.reply(MockMongoServer.DEFAULT_ISMASTER_36)
          } else if (doc.insert) {
            request.reply({ok: 1, operationTime: Date.now()})
          } else if (doc.find) {
            request.reply({ok: 1})
          } else if (doc.endSessions) {
            request.reply({ok: 1})
          }
        })
        resolve(server)
      }).catch(reject)
    })
  }
}
