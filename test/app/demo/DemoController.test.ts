import {request, prefix} from '../../TestHelper'

describe('Demo Test', () => {
  it('hello ', async () => {
    const {body} = await request.get(prefix + `/demo/hello/nick`).expect(200)
    // expect(body.code).toEqual(0)
  })
})
