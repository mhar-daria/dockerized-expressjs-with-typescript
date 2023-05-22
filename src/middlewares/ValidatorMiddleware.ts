import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

export default function validator(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    let newErrors: { [key: string]: string[] } = {}

    errors.array()?.map((error) => {
      newErrors[error.param] = [...(newErrors[error.param] || []), error.msg]
    })

    return res.status(400).json({
      data: [],
      message: 'Validation Failed',
      errors: newErrors,
    })
  }
}
