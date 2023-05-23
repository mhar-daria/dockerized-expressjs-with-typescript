import { describe, it } from 'node:test'
import request from 'supertest'
import { Server } from '../src/Server'

describe('Testing POST /api/login endpoint', () => {
  it('respond with token credentials to be used by UI', async () => {
    const response = await request(Server)
      .post('/api/login')
      .send({
        email: 'test meail',
      })
      .expect(200)
  })
})
