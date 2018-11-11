import { Injectable, NotAcceptableException } from '@nestjs/common';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasureEntity } from './measures.entity';
import { ProbesService } from './../probes/probes.service';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectRepository(MeasureEntity)
    private readonly measuresRepository: Repository<MeasureEntity>,
    private readonly probesService: ProbesService,
  ) {}

  async findAll(): Promise<MeasureEntity[]> {
    return await this.measuresRepository.find();
  }

  async findAllWithRelation(): Promise<MeasureEntity[]> {
    return await this.measuresRepository.find({ relations: ['probe', 'site'] });
  }

  async findByProbe(options): Promise<MeasureEntity[]> {
    const res = await this.measuresRepository
      .createQueryBuilder('measure')
      .innerJoinAndSelect('measure.probe', 'probe')
      .where(`measure.probe.id = ${options.probeId}`)
      .orderBy('measure.dateTime', 'DESC')
      .take(10)
      .getMany();
    return res;
  }

  async findBySite(siteId): Promise<MeasureEntity[]> {
    const res = await this.measuresRepository
      .createQueryBuilder('measure')
      .innerJoinAndSelect('measure.site', 'site')
      .innerJoinAndSelect('measure.probe', 'probe')
      .where(`measure.site.id = ${siteId}`)
      .orderBy('measure.dateTime', 'ASC')
      // .take(10)
      .getMany();
    return res;
  }

  async create(measure: MeasureEntity): Promise<MeasureEntity> {
    let newMeasure = new MeasureEntity();
    Object.assign(newMeasure, measure);
    const err = await validate(newMeasure);
    if (err.length > 0) {
      console.warn(err);
      throw new NotAcceptableException();
    }
    await this.probesService.updateFromMeasure(newMeasure);
    await this.measuresRepository.save(newMeasure);
    return newMeasure;
  }
}
