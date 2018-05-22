import {RechargeService} from './RechargeService'
import {RegisterService} from './RegisterService'

export class UserService {
  register = new RegisterService()
  recharge = new RechargeService()
}
