import * as assert from 'assert'
import {User} from '../model/User'
import {lib, order, redis} from '../modules'

const {logger, Constants} = lib

export class RegisterService extends order.OrderBusinessService {
  orderType = Constants.ORDER_TYPE.REGISTER

  async business (order, createUserDto) {
    const newUser = new User(createUserDto)
    await newUser.save()
    await newUser.registerSuccess()
    logger.info('register ', newUser.toObject())
    await this.testRedis()
    return {
      isSuccess: true,
      orderId: order.id
    }
  }

  /**
   * 和业务无关，纯粹是为了写个 Redis 的示例
   * @returns {Promise<void>}
   */
  async testRedis () {
    redis.set('foo', 'bar')
    const value = await redis.get('foo')
    assert.equal(value, 'bar')
  }

  async onFail (order, result): Promise<any> {
    return undefined
  }

  async onSuccess (order, result): Promise<any> {
    return undefined
  }
}
