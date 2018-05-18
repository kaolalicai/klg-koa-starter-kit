import {UserController} from './controller/UserController'

export function router (router) {

  /**
   * @api {post} /register  用户注册
   * @apiName Hello
   * @apiGroup User
   *
   * @apiParam {String} name  用户名.
   * @apiParam {String} phone  手机号.
   */
  router.post('/user/register', new UserController().register)
}
