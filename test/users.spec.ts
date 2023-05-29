import { describe, it } from 'mocha'
import request from 'supertest'
import server from '../src/Server'
import expect from 'expect'
import { mochaHooks } from './hooks'

// const server = request.agent('http://localhost:9001')
describe('Testing POST /api/<version>/users endpoint', () => {
  mochaHooks().beforeAll(this)
  it('should return unauthorized error', async () => {
    request(server)
      .post('/api/20221219/users')
      .send()
      .expect(401)
      .end((err, res) => {
        expect(res.body).toMatchObject({
          message: expect.any(String),
          code: expect.any(Number),
        })
        expect(res.body.message).toEqual('Unauthorized')
        expect(res.body.code).toEqual(401)
      })
  })

  it('should require first name', async () => {
    const response = await request(server)
      .post('/api/20221219/users')
      .send({
        lastName: 'test lastname',
        email: 'testing@gmail.com',
      })
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )

    expect(response.body.message).toEqual('Validation Failed')
    expect(response.body.errors.firstName[0]).toEqual('First name is required')
  })

  it('should require last name', async () => {
    const response = await global.agent
      .post('/api/20221219/users')
      .send({
        firstName: 'test first name',
        email: 'testing@gmail.com',
      })
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )

    expect(response.body.message).toEqual('Validation Failed')
    expect(response.body.errors.lastName[0]).toEqual('Last name is required')
  })

  it('should fail existing email', async () => {
    const response = await global.agent
      .post('/api/20221219/users')
      .send({
        lastName: 'test last name',
        firstName: 'test first name',
        email: 'dev-account@express.com',
      })
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )

    expect(response.body.message).toEqual('Validation Failed')
    expect(response.body.errors.email[0]).toEqual('Email already exists.')
  })

  it('should created new users', async () => {
    const response = await global.agent
      .post('/api/20221219/users')
      .send({
        lastName: 'Doe',
        firstName: 'Jane',
        email: 'jane.doe@email.com',
      })
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )

    expect(response.status).toEqual(201)
    expect(response.text).toEqual('Created')
  })
})
