import { getRepository, Repository } from 'typeorm';

import { Product } from '../../entities/Product';
import {
  IProductsRepository,
  ICreateProductDTO,
  IUpdateProductDTO,
} from '../IProductsRepository';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    name,
    description,
    price,
    user_id,
  }: ICreateProductDTO): Promise<void> {
    const product = this.repository.create({
      name,
      description,
      price,
      user_id,
    });

    await this.repository.save(product);
  }

  async list(): Promise<Product[]> {
    const products = await this.repository.find({
      relations: ['images', 'user'],
    });

    return products;
  }

  async update({
    id,
    name,
    description,
    price,
  }: IUpdateProductDTO): Promise<void> {
    const product = await this.repository.findOne({ id });

    if (name) {
      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (price) {
      product.price = price;
    }

    await this.repository.save(product);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne({ id });

    return product;
  }
}

export { ProductsRepository };
