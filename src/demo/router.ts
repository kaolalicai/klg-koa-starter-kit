import {DemoController} from './DemoController'

const demoController = new DemoController()

export function router (router) {

  /**
   * @api {get} /demo/hello/:name  say hello to user
   * @apiName Hello
   * @apiGroup Demo
   *
   * @apiParam {String} name  用户.
   */
  router.get('/demo/hello/:name', demoController.hello)
}
