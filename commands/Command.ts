#!/usr/bin/env ts-node

class Command implements AbstractCommandInterface {
  args: { [key: string]: any } = {}
  name: string = ''

  constructor() {
    this.main()
  }

  public getName() {
    return this.name
  }

  // void
  public main() {
    console.log('test')
  }

  public set arguments(values: { [key: string]: string }) {
    this.args = values
  }

  public get arguments(): { [key: string]: string } {
    return this.args
  }
}

export interface AbstractCommandInterface {
  name: string

  main(): void

  getName(): string

  set arguments(values: { [key: string]: string })

  get arguments(): { [key: string]: string }
}

export interface CommandInterface extends AbstractCommandInterface {
  name: string

  main(): void
}

export default Command
