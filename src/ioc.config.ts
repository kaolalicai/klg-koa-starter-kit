import {container} from '@akajs/core'
import {UserService} from './service'

container.bind<UserService>(UserService).to(UserService)
