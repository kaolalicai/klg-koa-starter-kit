import {lib, order, proxy} from '../../modules'
import {initFixuture, prefix, request} from '../../E2ETestHelper'

describe('User recharge Test', () => {
  initFixuture(__filename)
  const userId = '5b03b80c9b6c6043c138d1b6'
  it('recharge ', async () => {
    const spy = jest.spyOn(proxy.ThirdProxy.prototype, 'recharge')
    const {body} = await request.post(prefix + `/user/${userId}/recharge`)
      .send({
        amount: 300
      })
      .expect(200)
    expect(body.code).toEqual(0)

    expect(spy).toHaveBeenCalledTimes(1)
    const callsArg = spy.mock.calls[0][0]
    expect(callsArg)
    expect(callsArg.id)
    expect(callsArg.amount).toEqual(300)
  })

  it(' 可以找到充值订单 ', async () => {
    const fOrder = await order.OrderService.getInstance().findOne({})
    expect(fOrder)
    console.log('fOrder', fOrder.toObject())
    expect(fOrder.type).toEqual(lib.Constants.ORDER_TYPE.RECHARGE)
    expect(fOrder.amount).toEqual(300)
    expect(fOrder.status).toEqual(lib.Constants.ORDER_STATUS.PENDING)
  })
})
