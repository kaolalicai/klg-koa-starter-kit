import {IOrder} from '../model/Order'
import {lib} from '../modules'
import {OrderService} from './OrderService'

const {AppError} = lib

export interface BusinessResult {
  isSuccess: boolean
  isAsync?: boolean,
  error?: string,
  returnData?: any
}

export abstract class OrderBusinessService {
  orderType: string
  orderService = new OrderService()

  async process (data, ctx) {
    const order = await this.saveOrder(data, ctx)
    if (order.isDone()) return 'success'
    let result = null
    try {
      result = await this.business(order, data)
    } catch (err) {
      await order.fail(err)
      throw err
    }
    return await this.handleBusiness(order, result)
  }

  /**
   * 子类实现的业务逻辑
   * @param order
   * @param params 前端传来的原始参数
   * @returns {Promise.<void>}
   */
  abstract async business (order, params): Promise<BusinessResult>

  async handleBusiness (order, result: BusinessResult) {
    // 异步接口 在 CustodianController 里注册回调处理
    let isAsync = result && result.isAsync
    if (isAsync) {
      if (result.isSuccess) {
        return result.returnData
      } else {
        await order.fail(result.error)
        throw new AppError('系统内部错误 : ', result.error)
      }
    }
    // 同步接口
    if (result.isSuccess) {
      await this.bizCallback(result)
    } else {
      await this.bizFailCallback(result)
      if (result.error) throw result.error
      throw new AppError('请求存管失败 : ', result.error)
    }
    return result.returnData || 'success'
  }

  /**
   * 存管成功处理逻辑
   * @param result
   * @param {Order} order
   * @returns {Promise<void>}
   */
  async bizCallback (result, order?: IOrder) {
    let newOrder = order || await this.orderService.findAndCheckOrder(result.orderId, this.orderType)
    newOrder = await newOrder.done()
    await this.onSuccess(newOrder, result)
  }

  /**
   * 存管失败处理逻辑
   * @private
   * @param result
   * @param order
   * @returns {Promise.<void>}
   */
  async bizFailCallback (result, order?: IOrder) {
    let newOrder = order || await this.orderService.findAndCheckOrder(result.orderId, this.orderType)
    const error = result.error || result.msg || result.err
    newOrder = await newOrder.fail(error)
    return await this.onFail(newOrder, result)
  }

  async saveOrder (data, ctx) {
    if (!data.extend) data.extend = {}
    const order = await this.orderService.checkAndSaveOrder(data, this.orderType)
    if (ctx) ctx.request.body.orderId = order.id
    return order
  }

  /**
   * 子类实现业务逻辑，在调用存款成功时执行。
   * @abstract
   * @param order
   * @param result
   * @returns {Promise.<void>}
   */
  abstract async onSuccess (order, result)

  /**
   * 子类实现业务逻辑，在调用存款失败时执行。
   * @abstract
   * @param order
   * @param result
   * @returns {Promise.<void>}
   */
  abstract async onFail (order, result)
}
