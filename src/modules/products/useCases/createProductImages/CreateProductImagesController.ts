import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductImagesUseCase } from './CreateProductImagesUseCase';

interface IFiles {
  filename: string;
}

class CreateProductImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const createProductImagesUseCase = container.resolve(
      CreateProductImagesUseCase
    );

    const images_name = images.map((file) => file.filename);

    await createProductImagesUseCase.execute({ product_id: id, images_name });

    return response.status(201).send();
  }
}

export { CreateProductImagesController };
