import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { SetUserActiveController } from '../modules/users/useCases/setUserActive/SetUserActiveController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const setUserActiveController = new SetUserActiveController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/activate', setUserActiveController.handle);

export { usersRoutes };
