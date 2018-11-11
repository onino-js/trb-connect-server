import { MeasureEntity } from './../measures/measures.entity';
import { SiteEntity } from './../sites/sites.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('probes')
export class ProbeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'undefined' })
  name: string;

  @Column({ default: 0 })
  value: number;

  @Column()
  dateTime: Date;

  @ManyToOne(type => SiteEntity, site => site.probes, {
    cascade: true,
  })
  site: SiteEntity;

  @OneToMany(type => MeasureEntity, measure => measure.probe)
  measures: MeasureEntity[];
}
