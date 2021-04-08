import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppErrors';
import { IActivateTokensRepository } from '../../repositories/IActivateTokensRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  token: string;
}

@injectable()
class SetUserActiveUseCase {
  constructor(
    @inject('ActivateTokensRepository')
    private activateRepository: IActivateTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token }: IRequest): Promise<void> {
    const activateToken = await this.activateRepository.findByToken(token);

    if (!activateToken) {
      throw new AppError('Invalid token.');
    }

    const user = await this.usersRepository.findById(activateToken.user_id);
    if (!user) {
      throw new AppError('Users does not exist');
    }
    this.usersRepository.activateUser(user.id);
  }
}

export { SetUserActiveUseCase };
