import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Delete,
  Body,
  Put,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  // @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
  @Get('test')
  async test(): Promise<string> {
    return 'hello bro';
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() user) {
    if (!user || !user.id) {
      return {
        status: 500,
        message: 'Bad post body parameter for route /users/update',
      };
    } else {
      return await this.usersService.update(user);
    }
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() user) {
    // TODO : Check validity of input
    return await this.usersService.create(user);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Body('id') id) {
    const res = await this.usersService.remove(id);
    return res;
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
