import { describe, it } from 'mocha'
import server, { port } from '../../src/Server'
import expect from 'expect'
import request from 'supertest'
import { mochaHooks } from '../hooks'

describe('Items Endpoint', () => {
  mochaHooks().beforeAll(this)
  it('respond unauthorize access', () => {
    request(server)
      .get('/api/20221219/items')
      .send()
      .expect(401)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body).toMatchObject({
          message: expect.any(String),
        })
        expect(res.body.message).toEqual('Unauthorized')
        expect(res.body.code).toEqual(401)
      })
  })

  it('respond with success', () => {
    request(server)
      .get('/api/20221219/items')
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )
      .send()
      .expect(200)
      .end((err, response) => {
        expect(response.status).toEqual(200)
        expect(response.body).toMatchObject({
          message: expect.any(String),
          data: expect.any(Object),
        })
      })
  })
})
