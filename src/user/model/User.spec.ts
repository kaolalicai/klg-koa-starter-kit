import {TestHelper} from './TestHelper'
import {UserModel} from './User'

describe('UserModel test', async function () {
  let db

  beforeAll(async () => {
    db = await TestHelper.initMockDbConnection()
  })

  it(' save ', async () => {
    const u = new UserModel({name: 'JohnDoe', phone: '14366778876'})
    await u.save()
    const user = await UserModel.findOne()

    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
    expect(user.toObject()).toEqual({balance: 0, ok: 1})
    // expect(user.name).toEqual('JohnDoe')
    // expect(user.phone).toEqual('14366778876')
    // expect(user.balance).toEqual(0)
  })

  afterAll((done) => {
    TestHelper.close()
    done()
  })
})
