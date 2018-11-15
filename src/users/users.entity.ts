import { SiteEntity } from './../sites/sites.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
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

  @ManyToMany(type => SiteEntity, site => site.users, {
    cascade: true,
  })
  @JoinTable()
  sites: SiteEntity[];
}
