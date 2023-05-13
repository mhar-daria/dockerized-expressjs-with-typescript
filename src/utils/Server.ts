import { Express } from 'express'
import fs from 'fs'

const routesFolder = './src/routes'

export function version(app: Express): string[] {
  console.log(
    fs.readdir(routesFolder, (err, files) => {
      console.log(err, files)
    })
  )

  return ['test']
}
