import * as Joi from 'joi'
import * as _ from 'lodash'
import {IOrder, OrderModel} from '../model/Order'
import {lib} from '../modules'

const {Constants, ObjectId, AppError, logger} = lib

/**
 *  订单处理类
 * Created by nick on 2017/3/10.
 */
export class OrderService {
  static getModel () {
    return OrderModel
  }

  /**
   * 检查和保存 order
   * @param data
   * @param {string} orderType
   * @returns {Promise<Order>}
   */
  async checkAndSaveOrder (data, orderType: string): Promise<IOrder> {
    // save order
    let _order = _.clone(data)
    _order.type = orderType
    _order.amount = data.amount || 0
    _order.extend = data.extend || {}
    _order.status = data.status || Constants.ORDER_STATUS.PENDING
    _order._id = data.orderId ? ObjectId(data.orderId) : ObjectId()
    _order.requestId = _order._id.toString()
    logger.info('checkAndSaveOrder ', _order, orderType)
    return await new OrderModel(_order).save()
  }

  /**
   * 查询并检查订单是否完成状态
   * @param {string} orderId
   * @param {string} type
   * @returns {Promise<Order>}
   */
  async findAndCheckOrder (orderId: string, type: string): Promise<IOrder> {
    Joi.assert({orderId, type}, {
      orderId: Joi.string().length(24).required(),
      type: Joi.string().required()
    })
    const order = await OrderModel.findById(orderId)
    if (!order) throw new AppError(AppError.ERRORS.NOT_EXIST, '订单', orderId)
    logger.info('orderId %s type %s status %s', order.id, order.type, order.status)
    if (order.type !== type) throw new AppError(`订单类型有误 期望${type} 实际${order.type}`)
    if (order.status === Constants.ORDER_STATUS.DONE) throw new AppError(`${type} 订单已完成`)
    return order
  }
}
