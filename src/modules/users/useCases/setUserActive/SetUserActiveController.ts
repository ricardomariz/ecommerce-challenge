import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SetUserActiveUseCase } from './SetUserActiveUseCase';

class SetUserActiveController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    const setUserActiveUseCase = container.resolve(SetUserActiveUseCase);

    setUserActiveUseCase.execute({ token: String(token) });

    return response
      .status(200)
      .send('Your account is activated. You can now login to the application!');
  }
}

export { SetUserActiveController };
