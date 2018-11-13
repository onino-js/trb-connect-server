import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProbesService } from './probes.service';
import { ProbeEntity } from './probes.entity';

@Controller('probes')
export class ProbesController {
  constructor(private readonly probesService: ProbesService) {}

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<ProbeEntity[]> {
    return this.probesService.findAll();
  }
}
