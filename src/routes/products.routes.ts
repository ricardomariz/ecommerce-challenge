import crypto from 'crypto';
import { Router } from 'express';
import multer from 'multer';
import { resolve } from 'path';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { CreateProductController } from '../modules/products/useCases/createProduct/CreateProductController';
import { CreateProductImagesController } from '../modules/products/useCases/createProductImages/CreateProductImagesController';
import { DeleteProductController } from '../modules/products/useCases/deleteProduct/DeleteProductController';
import { ListProductsController } from '../modules/products/useCases/listProducts/ListProductsController';
import { UpdateProductController } from '../modules/products/useCases/updateProduct/UpdateProductController';

const productsRoutes = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', './tmp/images/products'),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
});

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();
const createProductImagesController = new CreateProductImagesController();

productsRoutes.use(ensureAuthenticated);

productsRoutes.post('/', createProductController.handle);

productsRoutes.post(
  '/images/:id',
  upload.array('file'),
  createProductImagesController.handle
);

productsRoutes.get('/', listProductsController.handle);

productsRoutes.put('/:id', updateProductController.handle);

productsRoutes.delete('/:id', deleteProductController.handle);

export { productsRoutes };
