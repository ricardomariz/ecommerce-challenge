import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { IUsersRepository, ICreateUserDTO } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository('User');
  }

  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ email, password });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async activateUser(id: string): Promise<void> {
    const user = await this.repository.findOne(id);

    user.isActive = true;

    await this.repository.save(user);
  }
}

export { UsersRepository };
