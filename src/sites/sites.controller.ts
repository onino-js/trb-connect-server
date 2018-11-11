import { Controller, Get, Delete, Body, Put, Param } from '@nestjs/common';
//import { sites } from './sites.mocks'
import { sitesService } from './sites.service';
import { SiteEntity } from './sites.entity';

@Controller('sites')
export class sitesController {
  constructor(private readonly sitesService: sitesService) {}

  @Get('list')
  async findAll(): Promise<SiteEntity[]> {
    return this.sitesService.findAll();
  }
}
