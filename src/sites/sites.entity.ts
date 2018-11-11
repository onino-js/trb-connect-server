import { MeasureEntity } from './../measures/measures.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProbeEntity } from './../probes/probes.entity';

@Entity('sites')
export class SiteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'undefined' })
  name: string;

  @OneToMany(type => ProbeEntity, probe => probe.site)
  probes: ProbeEntity[];

  @OneToMany(type => MeasureEntity, measure => measure.site)
  measures: MeasureEntity[];
}
