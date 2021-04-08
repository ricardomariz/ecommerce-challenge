import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../../users/entities/User';
import { ProductImage } from './ProductImage';

@Entity('products')
class Product {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'real' })
  price: number;

  @Column()
  user_id: string;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  published_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Product };
