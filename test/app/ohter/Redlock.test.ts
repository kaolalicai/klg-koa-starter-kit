import {other} from '../../modules'
import {initFixuture, prefix, request} from '../../E2ETestHelper'

describe('Redlock Test', () => {
  initFixuture(__filename)

  it('mutex ', async () => {
    const spy = jest.spyOn(other.OtherController, 'mutex')

    const data = {
      phone: '12312312312312312312'
    }
    const res1 = request.post(prefix + `/test/mutex`)
      .send(data)
      .expect(200)

    const res2 = request.post(prefix + `/test/mutex`)
      .send(data)
      .expect(200)

    const res3 = request.post(prefix + `/test/mutex`)
      .send(data)
      .expect(200)

    const [result1, result2, result3] = await Promise.all([res1, res2, res3])
    expect(JSON.parse(result1.text)).toEqual({code: 0, message: 'hello world'})
    expect(JSON.parse(result2.text)).toEqual({code: 1, message: '系统繁忙，请稍后再试'})
    expect(JSON.parse(result3.text)).toEqual({code: 1, message: '系统繁忙，请稍后再试'})
  })
})
