import('../test')
import {User} from '../model'
import {RegisterService} from './RegisterService'
import * as assert from 'assert'
import * as sinon from 'sinon'

describe('RegisterService test', async function () {

  it(' business ', async () => {
    const spySave = sinon.spy(User.prototype, 'save')
    const spy2 = sinon.spy(User.prototype, 'registerSuccess')
    const order = {}
    const createUserDto = {phone: '13567689876', name: 'nick'}
    await new RegisterService().business(order, createUserDto)

    assert(spySave.calledTwice)
    assert(spy2.calledOnce)
  })

})
