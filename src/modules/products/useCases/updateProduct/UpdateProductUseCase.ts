import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppErrors';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
}

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({ id, name, description, price }: IRequest): Promise<void> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) {
      throw new AppError('Product does not exists!');
    }

    this.productsRepository.update({ id, name, description, price });
  }
}

export { UpdateProductUseCase };
