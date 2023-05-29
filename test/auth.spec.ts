import { describe, it } from 'mocha'
import request from 'supertest'
import server from '../src/Server'
import expect from 'expect'
import { hashedPassword } from '../src/helpers/auth'
import { mochaHooks } from './hooks'

// const server = request.agent('http://localhost:9001')
describe('Testing POST /api/login endpoint', async () => {
  const hooks = mochaHooks()
  hooks.beforeEach(this)
  it('respond with validation failed', () => {
    global.agent
      .post('/api/login')
      .send({
        email: 'test meail',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Validation Failed')
        expect(res.body.errors).toHaveProperty('password')
        expect(res.body.errors.password[0]).toEqual('Password is required')
      })
  })

  it('respond with incorrect credentials', async () => {
    const { hash: password, nonce: tkid } = hashedPassword('incorrect password')
    request(server)
      .post('/api/login')
      .send({
        email: 'test101@gmail.com',
        password,
        tkid,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Email or password is incorrect.')
      })
  })

  it('respond with credentials', async () => {
    const { hash: password, nonce: tkid } = hashedPassword('password')
    request(server)
      .post('/api/login')
      .send({
        email: 'dev-account@express.com',
        password,
        tkid,
      })
      .expect(200)
      .end((err, res) => {
        global.auth = res.body
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('token')
        expect(res.body).toHaveProperty('expiration')
        expect(res.body).toHaveProperty('tokenType')

        expect(res.body).toMatchObject({
          message: 'successfully logged in',
          token: expect.any(String),
          expiration: expect.any(String),
          tokenType: expect.any(String),
        })
      })
  })

  hooks.afterEach(this)
})
