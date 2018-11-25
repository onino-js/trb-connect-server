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
    return await this.userRepository.findOne({ email: email });
  }

  async remove(id: number): Promise<any> {
    let userToRemove = await this.userRepository.findOne(id);
    let res: any;
    if (userToRemove === undefined) {
      res = {
        status: 404,
        message: "L'utilisateur n'existe pas",
      };
    } else {
      await this.userRepository.remove(userToRemove);
      res = {
        status: 200,
        message: "L'utilisateur a été supprimmé avec succès",
      };
    }
    return res;
  }

  async update(user: UserEntity): Promise<any> {
    let userToUpdate = await this.userRepository.findOne(user.id);
    let res;
    console.log(user)
    if (userToUpdate === undefined) {
      res = {
        status: 404,
        message: `User with name ${user.firstName} ${
          user.lastName
        }, does not exist`,
      };
    } else {
      await this.userRepository.save({ ...userToUpdate, ...user });
      res = {
        status: 200,
        message: `L'utilisateur a été mis à jours`,
      };
    }
    return res;
  }

  async create(user: User): Promise<UserEntity> {
    let newUser = new UserEntity();
    Object.assign(newUser, user);
    const err = await validate(newUser);
    let res;
    if (err.length > 0) {
      res = {
        status: 400,
        message: 'Mauvaises entrées',
      };
      // console.warn(err);
      // throw new NotAcceptableException();
    } else {
      await this.userRepository.save(newUser);
      res = { status: 200, message: "L'utilisateur a été ajouté" };
    }
    return res;
  }
}
