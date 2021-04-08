import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from './User';

@Entity('activate_tokens')
class ActivateToken {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ActivateToken };
