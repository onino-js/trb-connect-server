import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async createToken(@Body() body): Promise<any> {
    return await this.authService.login(body);
  }

  @Post('signup')
  async signup(@Body() body): Promise<any> {
    return await this.authService.signup(body);
  }
}
