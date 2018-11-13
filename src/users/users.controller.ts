import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Delete,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
  @Get('test')
  async test(): Promise<string> {
    console.warn('test');
    return 'hello bro';
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async add(@Body() { user }) {
    await this.usersService.create(user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id) {
    return this.usersService.remove(id);
  }
}
