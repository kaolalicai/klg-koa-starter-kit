import {UserModel} from '../model/User'
import {lib, order} from '../modules'

const {logger, Constants} = lib

export class RegisterService extends order.OrderBusinessService {
  orderType = Constants.ORDER_TYPE.REGISTER

  async business (order, createUserDto) {
    const newUser = new UserModel(createUserDto)
    await newUser.save()
    await newUser.registerSuccess()
    logger.info('register ', newUser.toObject())
    return {
      isSuccess: true
    }
  }

  async onFail (order, result): Promise<any> {
    return undefined
  }

  async onSuccess (order, result): Promise<any> {
    return undefined
  }
}
