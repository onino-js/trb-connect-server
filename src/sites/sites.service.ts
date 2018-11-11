import { Injectable, NotAcceptableException } from '@nestjs/common';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteEntity } from './sites.entity';

@Injectable()
export class sitesService {
  constructor(
    @InjectRepository(SiteEntity)
    private readonly sitesRepository: Repository<SiteEntity>,
  ) {}

  async findAll(): Promise<SiteEntity[]> {
    return await this.sitesRepository.find({ relations: ['probes'] });
  }

  async create(site: SiteEntity): Promise<SiteEntity> {
    let newSite = new SiteEntity();
    Object.assign(newSite, site);
    const err = await validate(newSite);
    if (err.length > 0) {
      console.warn(err);
      throw new NotAcceptableException();
    }
    await this.sitesRepository.save(newSite);
    return newSite;
  }
}
