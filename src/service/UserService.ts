import {Service} from '@akajs/ioc'

@Service()
export class UserService {
  async hello (name) {
    return 'hello ' + name
  }
}
