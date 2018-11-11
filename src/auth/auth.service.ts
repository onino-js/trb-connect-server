import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(cred) {
    const user = await this.usersService.findOneByEmail(cred.email);
    if (!user) throw new NotFoundException();
    if (user.password !== cred.password) throw new NotAcceptableException();
    return await this.createToken(cred);
  }

  async signup(payload) {
    const newUser = await this.usersService.create(payload);
    return await this.createToken(newUser);
  }

  async createToken(payload) {
    const user: JwtPayload = { email: payload.email };
    const expiresIn = 3600;
    const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    const user = await this.usersService.findOneByEmail(payload.email);
    return user;
  }
}
