#!/usr/bin/env ts-node

import Command from './Command'

class Sample extends Command {
  name: string = 'sample:runner'
  main() {
    console.log('hey', 'im now running')
  }
}

export default Sample
