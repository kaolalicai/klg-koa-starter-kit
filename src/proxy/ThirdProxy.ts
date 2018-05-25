import * as config from 'config'
import {BaseProxy} from './BaseProxy'

export class ThirdProxy extends BaseProxy {
  private static instance: ThirdProxy
  protected remoteUrl = config.get('third.url')

  static getInstance () {
    if (!this.instance) {
      this.instance = new ThirdProxy()
    }
    return this.instance
  }

  async recharge (order) {
    return await this.post('/recharge', {
      body: {
        orderId: order.id,
        amount: order.amount
      }
    })
  }
}
