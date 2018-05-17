import {UserService} from '../service/UserService'

/**
 * getUserByName
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getUserByName (ctx) {
  const {name} = ctx.params
  ctx.body = await UserService.getUserByName(name)
}
