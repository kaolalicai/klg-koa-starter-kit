import {UserModel} from '../model/User'
import {lib} from '../modules'

const {logger} = lib

export class UserService {

  async register (user) {
    const newUser = new UserModel(user)
    await newUser.save()
    logger.info('register ', newUser.toObject())
    await newUser.registerSuccess()
    return newUser.toObject()
  }
}
