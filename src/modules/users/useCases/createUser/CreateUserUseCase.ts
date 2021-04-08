import { hash } from 'bcrypt';
import handlebars from 'handlebars';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { AppError } from '../../../../errors/AppErrors';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { IActivateTokensRepository } from '../../repositories/IActivateTokensRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ActivateTokensRepository')
    private activateTokenRepository: IActivateTokensRepository,
    @inject('MailTrapProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('E-mail already registered');
    }

    const passwordHash = await hash(password, 8);

    const { id } = await this.usersRepository.create({
      email,
      password: passwordHash,
    });

    const activateToken = uuidV4();

    const { token } = await this.activateTokenRepository.create({
      user_id: id,
      token: activateToken,
    });

    const emailTemplateHtml = handlebars.compile(
      '<div>Clink in the link below to active your account. <br /> <a href="http://localhost:3333/users/activate/?token={{token}}">Activate! </a></div>'
    );

    this.mailProvider.sendEmail(
      'noreply@ecommerce.com',
      email,
      'Activate your account',
      emailTemplateHtml({ token })
    );
  }
}

export { CreateUserUseCase };
