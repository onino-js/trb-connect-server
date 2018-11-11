import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'undefined' })
  firstName: string;

  @Column({ default: 'undefined' })
  lastName: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;
}
