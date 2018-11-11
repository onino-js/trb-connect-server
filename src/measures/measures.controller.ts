import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { MeasureEntity } from './measures.entity';

@Controller('measures')
export class measuresController {
  constructor(private readonly measuresService: MeasuresService) {}

  @Get('list')
  async list(): Promise<MeasureEntity[]> {
    return this.measuresService.findAll();
  }
  @Get('list-all')
  async listAll(): Promise<MeasureEntity[]> {
    return this.measuresService.findAllWithRelation();
  }
  @Post('find-by-probe')
  async findByProbe(@Body() options): Promise<MeasureEntity[]> {
    return this.measuresService.findByProbe(options);
  }
  @Post('find-by-site')
  async findBySite(@Body() { siteId }): Promise<MeasureEntity[]> {
    return this.measuresService.findBySite(siteId);
  }
  @Post('data')
  async receiveData(@Body() data: any) {
    data.forEach((item: MeasureEntity) => this.measuresService.create(item));
    console.log('new measures saved in database');
    return {
      status: 200,
    };
  }
}
