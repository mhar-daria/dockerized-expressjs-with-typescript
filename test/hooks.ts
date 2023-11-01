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
    // afterEach(this: Mocha.Context) {},
    async beforeAll(this: Mocha.Context) {
      const { hash: password, nonce: tkid } = hashedPassword('password')

      const response = await global.agent.post('/api/login').send({
        email: 'dev-account@express.com',
        password,
        tkid,
      })

      global.credentials = {
        token: response.body.token,
        tokenType: response.body.tokenType,
      }
    },
  }
}
