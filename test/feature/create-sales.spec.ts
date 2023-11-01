import { describe, it } from 'mocha'
import Server from '../../src/Server'
import expect from 'expect'
import { mochaHooks } from '../hooks'
import request from 'supertest'

describe('Create Sales', () => {
  mochaHooks().beforeAll()

  it('should respond unauthorize access', () => {
    request(Server)
      .post('/api/20221219/sales')
      .send()
      .expect(401)
      .end((err, res) => {
        expect(res.body).toMatchObject({
          message: expect.any(String),
        })
        expect(res.body.message).toEqual('Unauthorized')
        expect(res.body.code).toEqual(401)
      })
  })
})
