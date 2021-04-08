import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppErrors';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) {
      throw new AppError('Product does not exists!');
    }

    this.productsRepository.delete(id);
  }
}

export { DeleteProductUseCase };
