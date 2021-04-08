import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  user_id: string;
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository
  ) {}

  async execute({
    name,
    description,
    price,
    user_id,
  }: IRequest): Promise<void> {
    this.productRepository.create({ name, description, price, user_id });
  }
}

export { CreateProductUseCase };
