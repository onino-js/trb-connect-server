import { Injectable, NotAcceptableException } from '@nestjs/common';
import { validate } from 'class-validator';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  onModuleDestroy() {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['sites'] });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    console.warn(email);
    return await this.userRepository.findOne({ email: email });
  }

  async remove(id: string): Promise<UserEntity[]> {
    let userToRemove = await this.userRepository.findOne(id);
    await this.userRepository.remove(userToRemove);
    return await this.userRepository.find();
  }

  async create(user: User): Promise<UserEntity> {
    let newUser = new UserEntity();
    Object.assign(newUser, user);
    const err = await validate(newUser);
    if (err.length > 0) {
      console.warn(err);
      throw new NotAcceptableException();
    }
    await this.userRepository.save(newUser);
    return newUser;
  }
}
