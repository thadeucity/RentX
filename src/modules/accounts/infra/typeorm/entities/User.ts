import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar', unique: true })
  driver_license!: string;

  @Column({ type: 'boolean', default: false })
  is_admin?: boolean;

  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
