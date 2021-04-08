import { User } from '../entities/User';

interface ICreateUserDTO {
  email: string;
  password: string;
}

interface IUsersRepository {
  create({ email, password }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  activateUser(id: string): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
