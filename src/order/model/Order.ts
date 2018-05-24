import {Document, Model, Schema} from 'mongoose'
import {lib, mongodb} from '../modules'

const {Constants} = lib
const db = mongodb.dbs.get('db')
const modelName = 'Order'

export interface IOrder {
  type: string
  userId: string
  requestId: string
  time: number
  amount: number,
  status: string
  error: {
    message: string
    code: string
  },
  extend: {}
}

export interface OrderModel extends IOrder, Document {
  done (): OrderModel

  fail (): OrderModel

  isDone (): boolean

  isFail (): boolean
}

const schema: Schema = new Schema({
  type: {type: String, required: true, index: true},
  userId: {type: String, index: true},
  requestId: {type: String, required: true, index: true},
  time: {
    type: Number, required: true, default: function () {
      return Date.now()
    }, index: true
  },
  amount: {type: Number, required: true, default: 0},
  error: {
    message: {type: String},    // 错误信息
    code: {type: String, sparse: true},       // 错误码
    type: {type: String}       // 错误类型
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(Constants.ORDER_STATUS),
    index: true,
    default: Constants.ORDER_STATUS.PENDING
  }
})

schema.methods.done = async function (this: OrderModel) {
  this.status = Constants.ORDER_STATUS.DONE
  return await this.save()
}

schema.methods.fail = async function (this: OrderModel) {
  this.status = Constants.ORDER_STATUS.FAIL
  return await this.save()
}

schema.methods.isDone = function () {
  return this.status === Constants.ORDER_STATUS.DONE
}

schema.methods.isFail = function () {
  return this.status === Constants.ORDER_STATUS.FAIL
}

schema.set('timestamps', true)        // createAt, updatedAt -> UTC
export const Order: Model<OrderModel> = db.model<OrderModel>(modelName, schema, modelName)
