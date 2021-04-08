import { inject, injectable } from 'tsyringe';

import { Product } from '../../entities/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.list();

    return products;
  }
}

export { ListProductsUseCase };
