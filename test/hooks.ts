import Mocha, { Context } from 'mocha'
import request from 'supertest'
import server from '../src/Server'
import { hashedPassword } from '../src/helpers/auth'

export type InjectableContext = Readonly<{}>

export type TestContext = Mocha.Context & Context

export const mochaHooks = (): Mocha.RootHookObject => {
  return {
    beforeEach(this: Mocha.Context) {
      const agent = request.agent(server)
      global.server = server
      global.agent = agent
    },
    afterEach(this: Mocha.Context) {},
    beforeAll(this: Mocha.Context) {
      const { hash: password, nonce: tkid } = hashedPassword('password')

      global.agent
        .post('/api/login')
        .send({
          email: 'dev-account@express.com',
          password,
          tkid,
        })
        .end((err, res) => {
          global.credentials = {
            token: res.body.token,
            tokenType: res.body.tokenType,
          }
        })
    },
  }
}
