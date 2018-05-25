import {lib, order} from '../modules'

const {Constants, NumberUtil} = lib

export class RechargeService extends order.OrderBusinessService {

  orderType = Constants.ORDER_TYPE.RECHARGE

  async business (order, createUserDto) {
    order.amount = NumberUtil.fixedNum(order.amount)
    // TODO http to 充值服务
    return {
      isAsync: true,
      isSuccess: true
    }
  }

  async onFail (order, result): Promise<any> {
    return undefined
  }

  async onSuccess (order, result): Promise<any> {
    // TODO AssetModule.addBalance
  }
}
