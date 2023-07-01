import * as _ from 'lodash'
// import Sample from './commands/Sample'
import { CommandInterface } from './commands/Command'
import Sample from './commands/Sample'
import { UUID } from 'sequelize'
import minimist from 'minimist'

type Subscriber = {
  [key: string]: {
    command: new <T>() => object
  }
}

class Runner {
  constructor() {
    this.main()
  }

  private subscriber: Subscriber = {}

  private commands: any[] = [Sample]

  public main() {
    const commandName: string = process.argv[2]
    const args: { [key: string]: string } = minimist(process.argv.slice(3))

    for (let i = 0; i < this.commands.length; i++) {
      const instance = new this.commands[i]()

      if (instance.getName() === commandName) {
        instance.arguments(args)
        instance.main()
      }
    }
  }
}

export default new Runner()
