import { getUserFromToken } from './../auth/get-user';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { sitesService } from './sites.service';
import { SiteEntity } from './sites.entity';

@Controller('sites')
export class sitesController {
  constructor(private readonly sitesService: sitesService) {}

  @Get('list')
  // @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() request): Promise<SiteEntity[]> {
    return this.sitesService.find();
  }

  @Get('list-mines')
  // @UseGuards(AuthGuard('jwt'))
  async findMines(@Req() request): Promise<SiteEntity[]> {
    const email = getUserFromToken(request);
    return this.sitesService.findMines(email);
  }

  @Get('get')
  // @UseGuards(AuthGuard('jwt'))
  async getAll(@Req() request): Promise<SiteEntity[]> {
    return this.sitesService.find();
  }

  @Get('get-mines')
  // @UseGuards(AuthGuard('jwt'))
  async getMines(@Req() request): Promise<SiteEntity[]> {
    const email = getUserFromToken(request);
    return this.sitesService.find();
  }

  @Post('create')
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() site): Promise<SiteEntity> {
    return this.sitesService.create(site);
  }

  @Post('delete')
  // @UseGuards(AuthGuard('jwt'))
  async remove(@Body() siteId): Promise<SiteEntity> {
    return this.sitesService.remove(siteId);
  }

  @Post('update')
  // @UseGuards(AuthGuard('jwt'))
  async update(@Body() site): Promise<SiteEntity> {
    return this.sitesService.update(site);
  }
}
