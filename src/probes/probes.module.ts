import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProbesController } from './probes.controller';
import { ProbesService } from './probes.service';
import { ProbeEntity } from './probes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProbeEntity])],
  controllers: [ProbesController],
  providers: [ProbesService],
  exports: [ProbesService],
})
export class ProbesModule {
  //constructor(private readonly connection: Connection) {}
}
