import { inject, injectable } from 'tsyringe';

import { Product } from '../../entities/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class GetProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);
    return product;
  }
}

export { GetProductUseCase };
