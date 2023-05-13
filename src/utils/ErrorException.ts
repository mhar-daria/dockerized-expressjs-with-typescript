export class ModelException extends Error {
  model?: string = ''

  constructor(message: string, model: string) {
    super()
    this.message = message
    this.model = model
  }

  get response(): object {
    return {
      code: 400,
      message: this.message || 'Records not found',
      data: [],
      errors: [],
    }
  }
} 

export class AuthException extends Error {
  constructor(message: string) {
    super()
    this.message = message
  }

  get response(): object {
    return {
      code: 401,
      message: this.message || 'Unauthorized',
      data: [],
      errors: [],
    }
  }
}

export class ErrorException extends Error {
  code?: number

  constructor(message: string, code: number = 500) {
    super()
    this.message = message
    this.code = code
  }

  get response(): object {
    return {
      code: this.code,
      message: this.message,
      data: [],
      errors: [],
    }
  }
}
