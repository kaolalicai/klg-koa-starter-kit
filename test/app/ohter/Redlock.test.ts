import {other} from '../../modules'
import {prefix, request} from '../../E2ETestHelper'
import * as sinon from 'sinon'
import * as assert from 'assert'

describe('Redlock Test', () => {

  it('mutex ', async () => {
    const spy = sinon.spy(other.OtherController, 'mutex')

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
    assert.deepEqual(JSON.parse(result1.text), {code: 0, message: 'hello world'})
    assert.deepEqual(JSON.parse(result2.text), {code: 1, message: '系统繁忙，请稍后再试'})
    assert.deepEqual(JSON.parse(result3.text), {code: 1, message: '系统繁忙，请稍后再试'})
  })
})
