import {request, prefix} from '../../TestHelper'

describe('Demo Test', () => {
  it('hello ', async () => {
    const {body} = await request.post(prefix + `/demo/hello`).expect(200)
    expect(body.code).toEqual(0)
  })
})
