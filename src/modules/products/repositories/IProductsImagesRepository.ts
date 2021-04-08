import { ProductImage } from '../entities/ProductImage';

interface IProductsImagesRepository {
  create(product_id: string, image_name: string): Promise<ProductImage>;
}

export { IProductsImagesRepository };
