import { FindOptions } from 'sequelize'
import _ from 'lodash'
import Product, { ProductAttributes, ProductOutput } from '../models/Product'
import Client, { ClientAttributes, ClientOutput } from '../models/Client'

interface ClientRepositoryInterface {
  find(
    id: number,
    options?: Omit<FindOptions<ClientAttributes>, 'where'> | undefined
  ): Promise<ClientOutput | null>

  deleteById(id: number): Promise<number | null>
}

class ClientRepository implements ClientRepositoryInterface {
  /**
   * Get client details using id
   *
   * @param id number
   * @param options object
   * @returns Promise<ClientOutput|null>
   */
  public find(
    id: number,
    options: Omit<FindOptions<ClientAttributes>, 'where'> | undefined = {}
  ): Promise<ClientOutput | null> {
    return Client.findByPk(id, options)
  }

  /**
   * Delete Client
   *
   * @param id number
   * @returns Promise<number|null>
   */
  public async deleteById(id: number): Promise<number | null> {
    return Client.destroy({
      where: {
        clientId: id,
      },
      cascade: true,
      hooks: true,
    })
  }
}

export default new ClientRepository()
