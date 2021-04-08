import { inject, injectable } from 'tsyringe';

import { ProductsImagesRepository } from '../../repositories/implementations/ProductsImagesRepository';
import { IProductsImagesRepository } from '../../repositories/IProductsImagesRepository';

interface IRequest {
  product_id: string;
  images_name: string[];
}

@injectable()
class CreateProductImagesUseCase {
  constructor(
    @inject(ProductsImagesRepository)
    private productsImagesRepository: IProductsImagesRepository
  ) {}

  async execute({ product_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.productsImagesRepository.create(product_id, image);
    });
  }
}

export { CreateProductImagesUseCase };
