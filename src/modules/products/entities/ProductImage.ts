import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Product } from './Product';

@Entity('product_images')
class ProductImage {
  @PrimaryColumn()
  id: string;

  @Column()
  image_name: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ProductImage };
