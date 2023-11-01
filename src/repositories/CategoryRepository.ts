import { FindOptions } from 'sequelize'
import _ from 'lodash'
import Category, {
  CategoryAttributes,
  CategoryOutput,
} from '../models/Category'

interface CategoryRepositoryInterface {
  find(
    id: number,
    options?: Omit<FindOptions<CategoryAttributes>, 'where'> | undefined
  ): Promise<CategoryOutput | null>

  deleteById(id: number): Promise<number | null>
}

class CategoryRepository implements CategoryRepositoryInterface {
  /**
   * Get category details using id
   *
   * @param id number
   * @param options object
   * @returns object
   */
  public find(
    id: number,
    options: Omit<FindOptions<CategoryAttributes>, 'where'> | undefined = {}
  ): Promise<CategoryOutput | null> {
    return Category.findByPk(id, options)
  }

  public async deleteById(id: number): Promise<number | null> {
    return Category.destroy({
      where: {
        categoryId: id,
      },
      cascade: true,
      hooks: true,
    })
  }

  public async all(
    options: Partial<FindOptions<CategoryAttributes>> | undefined = {}
  ): Promise<CategoryOutput[]> {
    const newOptions = {
      ...options,
      attributes: ['categoryId', 'name', 'description'],
    }
    return Category.findAll(newOptions)
  }
}

export default new CategoryRepository()
