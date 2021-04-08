import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price } = request.body;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    await updateProductUseCase.execute({ id, name, description, price });

    return response.status(200).send();
  }
}

export { UpdateProductController };
