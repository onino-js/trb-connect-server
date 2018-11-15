import { UserEntity } from './../users/users.entity';
import { MeasureEntity } from './../measures/measures.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { ProbeEntity } from './../probes/probes.entity';

@Entity('sites')
export class SiteEntity {
  @PrimaryColumn()
  id: number;

  @Column({ default: 'undefined' })
  name: string;

  @OneToMany(type => ProbeEntity, probe => probe.site)
  probes: ProbeEntity[];

  @OneToMany(type => MeasureEntity, measure => measure.site)
  measures: MeasureEntity[];

  @ManyToMany(type => UserEntity, user => user.sites)
  users: UserEntity[];
}
