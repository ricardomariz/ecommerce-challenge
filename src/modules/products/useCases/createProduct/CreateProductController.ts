import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price, user_id } = request.body;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute({
      name,
      description,
      price,
      user_id,
    });

    return response.status(201).send(product);
  }
}

export { CreateProductController };
