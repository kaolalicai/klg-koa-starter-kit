import {request, prefix} from '../../TestHelper'

describe('User Controller Test', () => {
  it('register ', async () => {
    const {body} = await request.post(prefix + `/user/register`)
      .send({
        name: 'nick',
        phone: '17698769876'
      })
      .expect(200)

    console.log('body', body)
    // expect(body.code).toEqual(0)
  })
})
