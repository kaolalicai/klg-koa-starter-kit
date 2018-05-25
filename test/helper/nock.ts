import * as config from 'config'
import * as nock from 'nock'

nock.register = function () {
  nock(config.get('third.url'))
    .persist()
    .post(/.*/)
    .reply(200, {code: 0, data: {}})
}

export { nock }
