import { MeasureEntity } from './../measures/measures.entity';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProbeEntity } from './probes.entity';

@Injectable()
export class ProbesService {
  constructor(
    @InjectRepository(ProbeEntity)
    private readonly probesRepository: Repository<ProbeEntity>,
  ) {}

  async findAll(): Promise<ProbeEntity[]> {
    return await this.probesRepository.find({ relations: ['site'] });
  }

  async create(probe: ProbeEntity): Promise<ProbeEntity> {
    let newProbe = new ProbeEntity();
    Object.assign(newProbe, probe);
    const err = await validate(newProbe);
    if (err.length > 0) {
      console.warn(err);
      throw new NotAcceptableException();
    }
    await this.probesRepository.save(newProbe);
    return newProbe;
  }

  async updateFromMeasure(measure: MeasureEntity): Promise<any> {
    let probesToUpdate = await this.probesRepository.findOne({
      id: measure.probe.id,
    });
    probesToUpdate.dateTime = measure.dateTime;
    probesToUpdate.value = measure.value;
    await this.probesRepository.save(probesToUpdate);
    return measure;
  }
}
