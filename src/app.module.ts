import { MeasuresModule } from './measures/measures.module';
import { ProbesModule } from './probes/probes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SitesModule } from './sites/sites.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SitesModule,
    ProbesModule,
    MeasuresModule,
    TypeOrmModule.forRoot(),
  ],
})
export class ApplicationModule {}
