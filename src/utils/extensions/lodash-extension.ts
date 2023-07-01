import { LoDashStatic } from 'lodash'

declare global {
  interface LoDashStatic {
    pascalCase: (string: string) => string
  }
}
