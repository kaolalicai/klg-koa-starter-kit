import {test} from '../modules'
import {User} from './User'
test.initFixuture(__filename)

describe('UserModel test', async function () {

  it(' save ', async () => {
    const u = new User({name: 'JohnDoe', phone: '14366778876'})
    await u.save()
    const user = await User.findOne()

    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
    expect(user.name).toEqual('JohnDoe')
    expect(user.phone).toEqual('14366778876')
    expect(user.balance).toEqual(0)
  })

})
