import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { sitesController } from './sites.controller';
import { sitesService } from './sites.service';
import { SiteEntity } from './sites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity])],
  controllers: [sitesController],
  providers: [sitesService],
  exports: [sitesService],
})
export class SitesModule {
  //constructor(private readonly connection: Connection) {}
}
