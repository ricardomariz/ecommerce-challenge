import { getRepository, Repository } from 'typeorm';

import { ProductImage } from '../../entities/ProductImage';
import { IProductsImagesRepository } from '../IProductsImagesRepository';

class ProductsImagesRepository implements IProductsImagesRepository {
  private repository: Repository<ProductImage>;

  constructor() {
    this.repository = getRepository(ProductImage);
  }

  async create(product_id: string, image_name: string): Promise<ProductImage> {
    const newImage = this.repository.create({
      image_name,
      product_id,
    });

    await this.repository.save(newImage);

    return newImage;
  }
}

export { ProductsImagesRepository };
