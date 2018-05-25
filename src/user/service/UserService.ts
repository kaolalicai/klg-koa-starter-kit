import {RechargeService} from './RechargeService'
import {RegisterService} from './RegisterService'

export class UserService {
  private static instance

  register = new RegisterService()

  recharge = new RechargeService()

  static getInstance () {
    if (!this.instance) {
      this.instance = new UserService()
    }
    return this.instance
  }
}
