import { Controller, Get, Delete, Body, Put, Param } from '@nestjs/common';
//import { users } from './users.mocks'
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
  @Get('test')
  async test(): Promise<string> {
    console.warn('test');
    return 'hello bro';
  }

  @Put()
  async add(@Body() { user }) {
    await this.usersService.create(user);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return this.usersService.remove(id);
  }
}
