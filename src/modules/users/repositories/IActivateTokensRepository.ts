import { ActivateToken } from '../entities/ActivateToken';

interface ICreateActivateTokenDTO {
  user_id: string;
  token: string;
}

interface IActivateTokensRepository {
  create({ user_id }: ICreateActivateTokenDTO): Promise<ActivateToken>;
  findByToken(token: string): Promise<ActivateToken>;
}

export { IActivateTokensRepository, ICreateActivateTokenDTO };
