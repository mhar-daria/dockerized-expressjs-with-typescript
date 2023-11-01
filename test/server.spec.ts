import { describe, it } from 'mocha'
import { port } from '../src/Server'
import expect from 'expect'

describe('Server', () => {
  it('tests that server is running in current port', async () => {
    expect(port()).toEqual(parseInt(process.env.PORT || '', 10))
  })
})
