import {database, lib} from '../modules'
import {Context} from 'Koa'
import * as moment from 'moment'
import {Redlock} from 'klg-redlock'
import * as _ from 'lodash'
// import * as redis from 'redis'

const client = database.redis

const bufferLock = new Redlock({
  client,
  retryConfig: {
    retryCount: Math.floor(1000 * 60 * 5 / 400), // 重试次数 这里需要重试一分钟
    retryDelay: 400   // 重试间隔
  }
})

const mutexLock = new Redlock({
  client,
  retryConfig: {
    retryCount: 0
  }
})

const {logger} = lib

/**
 * 排队执行
 * @param key
 * @returns {(ctx, next) => Promise<any>}
 */
export function buffer (key) {
  return async (ctx, next) => {
    const resource = getKey(ctx, key)
    if (!resource) {
      logger.info('no key ', key)
      return await next()
    }
    await bufferLock.using(async (lock) => {
      await next()
    }, {resource: getFullKey(ctx, resource)})
  }
}

/**
 * 排它锁
 * @param key
 * @param {number} ttl
 * @returns {(ctx, next) => Promise<any>}
 */
export function mutex (key, ttl = moment.duration(1, 'day').asMilliseconds()) {
  return async (ctx, next) => {
    const resource = getKey(ctx, key)
    if (!resource) {
      logger.info('no key ', key)
      return await next()
    }
    await mutexLock.using(async (lock) => {
      await next()
    }, {resource: getFullKey(ctx, resource), ttl})
  }
}

function getApiUrl (ctx: Context) {
  return _.last(ctx.url.split('/'))
}

function getKey (ctx, key) {
  const params = ctx.request.body
  Object.assign(params, ctx.request.query)
  Object.assign(params, ctx.params)
  return params[key]
}

function getFullKey (ctx, resource) {
  const url = getApiUrl(ctx)
  return [url, resource].join('-')
}
