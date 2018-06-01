import {lib, order, proxy} from '../../modules'
import {prefix, request} from '../../E2ETestHelper'
import * as sinon from 'sinon'
import * as assert from 'assert'

describe('User recharge Test', () => {
  const userId = '5b03b80c9b6c6043c138d1b6'
  it('recharge ', async () => {
    const spy = sinon.spy(proxy.ThirdProxy.prototype, 'recharge')
    const {body} = await request.post(prefix + `/user/${userId}/recharge`)
      .send({
        amount: 300
      })
      .expect(200)
    assert(body.code === 0)

    assert(spy.calledOnce)
    const callsArg = spy.args[0][0]
    assert(callsArg)
    assert(callsArg.id)
    assert(callsArg.amount === 300)
  })

  it(' 可以找到充值订单 ', async () => {
    const fOrder = await order.OrderService.getInstance().findOne({})
    assert(fOrder)
    console.log('fOrder', fOrder.toObject())
    assert(fOrder.type === lib.Constants.ORDER_TYPE.RECHARGE)
    assert(fOrder.amount === 300)
    assert(fOrder.status === lib.Constants.ORDER_STATUS.PENDING)
  })
})
