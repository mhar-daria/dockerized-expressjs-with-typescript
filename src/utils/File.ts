import fs from 'fs'
import _ from 'lodash'

class File {
  protected baseDir: string = ''
  protected public: string = 'public/storage'

  constructor() {
    this.baseDir = `${__dirname}/../../`
  }

  isFolderExists(location: string, isPublic: boolean = true): boolean {
    const dir = `${this.public}/${location}`

    return fs.existsSync(dir)
  }

  exits(location: string, isPublic: boolean = true): boolean {
    const dir = `${this.baseDir}${
      isPublic === true ? this.public : ''
    }/${location}`
    return fs.existsSync(`${location}`)
  }

  mkdir(location: string): void {
    fs.mkdirSync(`${this.public}/${location}`)
  }

  write(filePath: string, message: string, isPublic: boolean = true): void {
    const dir = _.startsWith(filePath, '/')
      ? filePath
      : this.baseDir + `${isPublic === true ? this.public : ''}/${filePath}`

    const exists = this.exits(dir)
    if (!this.exits(dir)) {
      fs.writeFileSync(dir, message)
    } else {
      fs.appendFileSync(dir, message)
    }
  }
}

export default File
