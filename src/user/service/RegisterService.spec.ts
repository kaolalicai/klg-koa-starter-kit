import {RegisterService} from './RegisterService'
import mockingoose from 'mockingoose'

describe('RegisterService test', async function () {

  it(' business ', async () => {
    mockingoose.users.toReturn({ _id: '507f191e810c19729de860ea' }, 'save')
    // const spySave = jest.spyOn(UserModel.prototype, 'save')
    // const spy2 = jest.spyOn(UserModel.prototype, 'registerSuccess')
    const order = {}
    const createUserDto = {phone: '13567689876', name: 'nick'}
    await new RegisterService().business(order, createUserDto)

    // expect(spySave).toHaveBeenCalledTimes(1)
    // expect(spy2).toHaveBeenCalledTimes(1)
  })

})
