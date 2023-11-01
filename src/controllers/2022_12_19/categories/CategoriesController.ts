import { Request, Response } from 'express'
import { HttpResponse } from '../../../types/HttpResponse'
import { CategoryOutput } from '../../../models/Category'
import CategoryRepository from '../../../repositories/CategoryRepository'

async function getCategories(
  req: Request,
  res: Response
): Promise<HttpResponse> {
  const categories: CategoryOutput[] = await CategoryRepository.all()
  return res.status(200).send({
    message: 'Category list',
    data: categories,
  })
}

export default {
  getCategories,
}
