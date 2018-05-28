import * as config from 'config'
import {TraceService} from 'klg-tracer'
// 链路追踪
if (config.tracer.enabled) {
  new TraceService().registerHooks({
    httpServer: {
      useKoa: true,
      requestFilter: function (ctx) {
        console.log('url=============', ctx.url)
        // 不记录 get 请求
        return ctx.method === 'GET'
      }
    },
    httpClient: {
      enabled: false
    }
  }).registerMongoReporter({
    mongoUrl: config.database.mongodb[0].url,
    collectionName: 'Tracer'
  })
}
require('koa')
