import {test} from '../modules'
import {User} from '../model'
import {RegisterService} from './RegisterService'
test.initFixuture(__filename)

describe('RegisterService test', async function () {

  it(' business ', async () => {
    const spySave = jest.spyOn(User.prototype, 'save')
    const spy2 = jest.spyOn(User.prototype, 'registerSuccess')
    const order = {}
    const createUserDto = {phone: '13567689876', name: 'nick'}
    await new RegisterService().business(order, createUserDto)

    expect(spySave).toHaveBeenCalledTimes(2)
    expect(spy2).toHaveBeenCalledTimes(1)
  })

})
