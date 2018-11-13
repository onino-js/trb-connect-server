import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { sitesService } from './sites.service';
import { SiteEntity } from './sites.entity';

@Controller('sites')
export class sitesController {
  constructor(private readonly sitesService: sitesService) {}

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<SiteEntity[]> {
    return this.sitesService.findAll();
  }
}
