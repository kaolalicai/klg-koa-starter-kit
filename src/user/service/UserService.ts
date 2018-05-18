import {UserModel} from '../model/User'
import {lib} from '../modules'

const {logger} = lib

export class UserService {

  async register (user) {
    const newUser = new UserModel(user)
    await newUser.save()
    await newUser.registerSuccess()
    logger.info('register ', newUser.toObject())
    return newUser.toObject()
  }
}
