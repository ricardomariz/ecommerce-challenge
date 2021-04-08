import { container } from 'tsyringe';

import { ProductsImagesRepository } from '../../modules/products/repositories/implementations/ProductsImagesRepository';
import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';
import { IProductsImagesRepository } from '../../modules/products/repositories/IProductsImagesRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';
import { IActivateTokensRepository } from '../../modules/users/repositories/IActivateTokensRepository';
import { ActivateTokensRepository } from '../../modules/users/repositories/implementations/ActivateTokensRepository';
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';

container.register<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.register<IProductsImagesRepository>(
  'ProductsImagesRepository',
  ProductsImagesRepository
);

container.register<IUsersRepository>('UsersRepository', UsersRepository);

container.register<IActivateTokensRepository>(
  'ActivateTokensRepository',
  ActivateTokensRepository
);
