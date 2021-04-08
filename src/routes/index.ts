import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { productsRoutes } from './products.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/products', productsRoutes);
router.use('/users', usersRoutes);

export { router };
