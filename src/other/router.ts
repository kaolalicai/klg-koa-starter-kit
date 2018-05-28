import * as OtherController from './controller/OtherController'
import {common} from './modules'

export function router (router) {

  router.post(
    '/test/mutex',
    common.Redlock.mutex('phone'),
    OtherController.mutex)
}
