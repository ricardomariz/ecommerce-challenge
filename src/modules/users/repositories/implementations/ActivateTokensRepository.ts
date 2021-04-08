import { getRepository, Repository } from 'typeorm';

import { ActivateToken } from '../../entities/ActivateToken';
import {
  IActivateTokensRepository,
  ICreateActivateTokenDTO,
} from '../IActivateTokensRepository';

class ActivateTokensRepository implements IActivateTokensRepository {
  private repository: Repository<ActivateToken>;

  constructor() {
    this.repository = getRepository('ActivateToken');
  }
  async findByToken(token: string): Promise<ActivateToken> {
    const activateToken = await this.repository.findOne({ token });

    return activateToken;
  }

  async create({
    user_id,
    token,
  }: ICreateActivateTokenDTO): Promise<ActivateToken> {
    const activeToken = this.repository.create({ user_id, token });

    await this.repository.save(activeToken);

    return activeToken;
  }
}

export { ActivateTokensRepository };
