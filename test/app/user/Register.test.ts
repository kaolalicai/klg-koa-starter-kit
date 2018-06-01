import {prefix, request} from '../../E2ETestHelper'
import * as assert from 'assert'

describe('User register Test', () => {
  it('register ', async () => {
    const {body} = await request.post(prefix + `/user/register`)
      .send({
        name: 'nick',
        phone: '17698769876'
      })
      .expect(200)

    // console.log('body', body)
    assert(body.code === 0)
  })
})
