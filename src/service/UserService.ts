import {Service} from '@akajs/ioc'

@Service()
export class UserService {
  async hello (name: string) {
    return 'hello ' + name
  }
}
