import * as UserController from './controller/UserController'

export function router (router) {

  /**
   * @api {post} /register  用户注册
   * @apiName Register
   * @apiGroup User
   *
   * @apiParam {String} name  用户名.
   * @apiParam {String} phone  手机号.
   */
  router.post('/user/register', UserController.register)

  /**
   * @api {post} /recharge  用户注册
   * @apiName Recharge
   * @apiGroup User
   *
   * @apiUse userId
   * @apiParam {Number} amount  用户名.
   */
  router.post('/user/:userId/recharge', UserController.recharge)
}
