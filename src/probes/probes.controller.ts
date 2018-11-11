import { Controller, Get, Delete, Body, Put, Param } from '@nestjs/common';
//import { probes } from './probes.mocks'
import { ProbesService } from './probes.service';
import { ProbeEntity } from './probes.entity';

@Controller('probes')
export class ProbesController {
  constructor(private readonly probesService: ProbesService) {}

  @Get('list')
  async findAll(): Promise<ProbeEntity[]> {
    return this.probesService.findAll();
  }
}
