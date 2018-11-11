import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { measuresController } from './measures.controller';
import { MeasuresService } from './measures.service';
import { MeasureEntity } from './measures.entity';
import { ProbeEntity } from './../probes/probes.entity';
import { ProbesService } from './../probes/probes.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasureEntity, ProbeEntity])],
  controllers: [measuresController],
  providers: [MeasuresService, ProbesService],
  exports: [MeasuresService, ProbesService],
})
export class MeasuresModule {
  //constructor(private readonly connection: Connection) {}
}
