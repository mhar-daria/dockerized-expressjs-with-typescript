import _ from 'lodash'

declare module 'lodash' {
  interface LoDashStatic {
    pascalCase: (value: string) => string
  }
}

_.mixin({
  pascalCase: _.flow(_.camelCase, _.upperFirst),
})

export default _
