import('../test')
import {User} from './User'
import * as assert from 'assert'

describe('UserModel test', async function () {

  it(' save ', async () => {
    const u = new User({name: 'JohnDoe', phone: '14366778876'})
    await u.save()
    const user = await User.findOne()

    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
    assert(user.name === 'JohnDoe')
    assert(user.phone === '14366778876')
    assert(user.balance === 0)
  })

})
