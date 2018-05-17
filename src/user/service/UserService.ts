import { User } from '../model/User'

export class UserService {

  static async getUserByName (name: string) {
    return await User.findOne({name: name})
  }
}
