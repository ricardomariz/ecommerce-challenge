import { Product } from '../entities/Product';

interface ICreateProductDTO {
  name: string;
  description: string;
  price: number;
  image?: string;
  user_id: string;
}

interface IUpdateProductDTO {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
}

interface IProductsRepository {
  create({
    name,
    description,
    price,
    image,
    user_id,
  }: ICreateProductDTO): Promise<void>;
  list(): Promise<Product[]>;
  update({ name, description, price, image }: IUpdateProductDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Product>;
}

export { IProductsRepository, ICreateProductDTO, IUpdateProductDTO };
