import {Document} from 'mongoose'
import {instanceMethod, InstanceType, prop} from 'typegoose'
import {lib, mongodb} from '../modules'

class OrderError {
  @prop()
  message: string    // 错误信息

  @prop({sparse: true})
  code?: string        // 错误码
}

class OrderExtend {
  @prop()
  message: string    // 错误信息

  @prop({sparse: true})
  code: string        // 错误码
}

export class Order extends mongodb.BaseModel {
  @prop({required: true})
  type: string

  @prop({required: true, index: true})
  userId: string

  @prop({required: true, index: true, unique: true})
  requestId: string

  @prop({
    required: true, index: true, default: () => Date.now()
  })
  time: number

  @prop()
  error: OrderError

  @prop({required: true})
  amount: number

  @prop({
    required: true,
    enum: Object.values(lib.Constants.ORDER_STATUS),
    index: true,
    default: lib.Constants.ORDER_STATUS.PENDING
  })
  status: string

  @prop()
  extend: OrderExtend

  @instanceMethod
  done (this: InstanceType<Order>) {
    this.status = lib.Constants.ORDER_STATUS.DONE
    return this.save()
  }

  @instanceMethod
  fail (this: InstanceType<Order>, error: string, code?) {
    this.error = {
      message: error,
      code
    }
    this.status = lib.Constants.ORDER_STATUS.FAIL
    return this.save()
  }

  @instanceMethod
  isDone (this: InstanceType<Order>) {
    return this.status === lib.Constants.ORDER_STATUS.DONE
  }

  @instanceMethod
  isPending (this: InstanceType<Order>) {
    return this.status === lib.Constants.ORDER_STATUS.PENDING
  }

  @instanceMethod
  isConfirming (this: InstanceType<Order>) {
    return this.status === lib.Constants.ORDER_STATUS.CONFIRMING
  }

  @instanceMethod
  isFail (this: InstanceType<Order>) {
    return this.status === lib.Constants.ORDER_STATUS.FAIL
  }
}

export declare type IOrder = Order & Document
export const OrderModel = new Order().getModelForClass(Order)
