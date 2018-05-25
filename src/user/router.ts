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
   * @api {post} /recharge  用户充值
   * @apiName Recharge
   * @apiGroup User
   *
   * @apiUse userId
   * @apiParam {Number} amount  充值金额.
   *
   * @apiUse responseExample
   * @apiSuccessExample {json} Fail-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "code" : 1
   *      "message" : "余额不足"
   *    }
   */
  router.post('/user/:userId/recharge', UserController.recharge)
}
