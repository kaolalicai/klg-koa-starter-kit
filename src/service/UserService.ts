import {Injectable} from '@akajs/core'

@Injectable()
export class UserService {
  async hello (name) {
    return 'hello ' + name
  }
}
