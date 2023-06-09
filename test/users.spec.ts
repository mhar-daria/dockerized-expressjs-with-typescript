import { describe, it } from 'mocha'
import request from 'supertest'
import server from '../src/Server'
import expect from 'expect'
import { mochaHooks } from './hooks'
import User from '../src/models/User'
import { response } from 'express'

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

  it('should require first name', () => {
    request(server)
      .post('/api/20221219/users')
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )
      .set('Connection', 'keep-alive')
      .set('Content-Type', 'application/json')
      .send({
        lastName: 'test lastname',
        email: 'testing@gmail.com',
      })
      .end((err, response) => {
        expect(response.body.message).toEqual('Validation Failed')
        expect(response.body.errors.firstName[0]).toEqual(
          'First name is required'
        )
      })
  })

  it('should require last name', () => {
    request(server)
      .post('/api/20221219/users')
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )
      .send({
        firstName: 'test first name',
        email: 'testing@gmail.com',
      })
      .end((err, response) => {
        expect(response.body.message).toEqual('Validation Failed')
        expect(response.body.errors.lastName[0]).toEqual(
          'Last name is required'
        )
      })
  })

  it('should fail existing email', async () => {
    request(server)
      .post('/api/20221219/users')
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )
      .send({
        lastName: 'test last name',
        firstName: 'test first name',
        email: 'dev-account@express.com',
      })
      .end((err, response) => {
        expect(response.body.message).toEqual('Validation Failed')
        expect(response.body.errors.email[0]).toEqual('Email already exists.')
      })
  })

  it('should created new users', (done) => {
    request(server)
      .post('/api/20221219/users')
      .set(
        'Authorization',
        `${global.credentials.tokenType} ${global.credentials.token}`
      )
      .send({
        lastName: 'Doe',
        firstName: 'Jane',
        email: 'jane.doe@email.com',
      })
      .expect(201)
      .end((err, response) => {
        if (err) done(err)
        expect(response.status).toEqual(201)
        expect(response.text).toEqual('Created')
      })
  })
})
