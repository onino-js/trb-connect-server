import { getUserFromToken } from './../auth/get-user';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { sitesService } from './sites.service';
import { SiteEntity } from './sites.entity';

@Controller('sites')
export class sitesController {
  constructor(private readonly sitesService: sitesService) {}

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() request): Promise<SiteEntity[]> {
    const email = getUserFromToken(request);
    return this.sitesService.find(email);
  }
}
