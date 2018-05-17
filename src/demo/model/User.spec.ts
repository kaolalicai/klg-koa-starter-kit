import {TestHelper} from './TestHelper'
import {UserModel} from './User'

describe('UserModel test', async function () {
  let db

  beforeAll(async () => {
    db = await TestHelper.initMockDbConnection()
  })

  it(' save ', async () => {
    const u = new UserModel({name: 'JohnDoe'})
    await u.save()
    const user = await UserModel.findOne()

    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
    console.log(user)
    expect(user.toObject()).toEqual({ok: 1})
  })

  afterAll((done) => {
    db.cleanup(done)
  })
})
