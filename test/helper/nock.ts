import * as nock from 'nock'

nock.register = function () {
  nock('http://localhost')
    .persist()
    .post(/.*/)
    .reply(200, {code: 0, data: {}})
}

export { nock }
