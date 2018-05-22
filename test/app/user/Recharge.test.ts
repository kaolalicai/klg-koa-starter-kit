import {lib, order} from '../../modules'
import {prefix, request} from '../../TestHelper'

describe('User recharge Test', () => {
  const userId = '5b03b80c9b6c6043c138d1b6'
  it('recharge ', async () => {
    const {body} = await request.post(prefix + `/user/${userId}/recharge`)
      .send({
        amount: 300
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it(' 可以找到充值订单 ', async () => {
    const fOrder = await order.OrderService.getModel().findOne({})
    expect(fOrder)
    console.log('fOrder', fOrder.toObject())
    expect(fOrder.type).toEqual(lib.Constants.ORDER_TYPE.RECHARGE)
    expect(fOrder.amount).toEqual(300)
    expect(fOrder.status).toEqual(lib.Constants.ORDER_STATUS.PENDING)
  })
})
