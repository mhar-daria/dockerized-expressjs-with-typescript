import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'

export interface CategoryAttributes {
  categoryId: number
  name: string
  description: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface CategoryInput
  extends Optional<CategoryAttributes, 'categoryId'> {}

export interface CategoryOutput extends Required<CategoryAttributes> {}

class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public categoryId!: number
  public name!: string
  public description!: string
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date | null

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Model[]) {
    // define association here
  }

  public transform(options: string[] = []): Partial<CategoryAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

Category.init(
  {
    categoryId: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    modelName: 'Category',
    timestamps: true,
    paranoid: true,
  }
)

export default Category
