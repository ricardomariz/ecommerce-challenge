import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Product } from '../../products/entities/Product';

@Entity('users')
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
