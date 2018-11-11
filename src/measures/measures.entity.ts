import { SiteEntity } from './../sites/sites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProbeEntity } from './../probes/probes.entity';

@Entity('measures')
export class MeasureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: Date;

  @Column()
  value: number;

  @ManyToOne(type => ProbeEntity, probe => probe.measures, {
    cascade: true,
  })
  probe: ProbeEntity;

  @ManyToOne(type => SiteEntity, site => site.measures, {
    cascade: true,
  })
  site: SiteEntity;
}
