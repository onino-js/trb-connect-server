import { UserEntity } from './../users/users.entity';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteEntity } from './sites.entity';

@Injectable()
export class sitesService {
  constructor(
    @InjectRepository(SiteEntity)
    private readonly sitesRepository: Repository<SiteEntity>,
  ) {}

  async find(): Promise<SiteEntity[]> {
    return await this.sitesRepository.find({ relations: ['probes'] });
  }

  async findMines(email): Promise<SiteEntity[]> {
    let res = await this.sitesRepository.find({
      relations: ['probes', 'users'],
    });
    res = res.filter((site: SiteEntity, index: number) => {
      return (
        site.users.findIndex(
          (user: UserEntity, index: number) => user.email === email,
        ) !== -1
      );
    });
    return res;
  }

  async remove(id: number): Promise<any> {
    let siteToRemove = await this.sitesRepository.findOne(id);
    let res: any;
    if (siteToRemove === undefined) {
      res = {
        status: 404,
        message: "Le site n'existe pas",
      };
    } else {
      try {
        await this.sitesRepository.remove(siteToRemove);
        res = {
          status: 200,
          message: "L'utilisateur a été supprimmé avec succès",
        };
      } catch (e) {
        res = {
          status: 500,
          message: "Problème lors de l'enregistrement",
        };
      }
    }
    return res;
  }

  async create(site: SiteEntity): Promise<SiteEntity> {
    let newSite = new SiteEntity();
    Object.assign(newSite, site);
    let res;
    newSite.id = Math.round(Math.abs(Math.random()) * 10000000);
    const err = await validate(newSite);
    if (err.length > 0) {
      res = {
        status: 400,
        message: 'Mauvaises entrées',
      };
    } else {
      try {
        await this.sitesRepository.save(newSite);
        res = { status: 200, message: 'Le site a été ajouté' };
      } catch (e) {
        res = { status: 500, message: "Problème lors de l'enregistrement" };
      }
    }
    return res;
  }

  async update(site: SiteEntity): Promise<any> {
    let siteToUpdate = await this.sitesRepository.findOne(site.id);
    let res;
    if (siteToUpdate === undefined) {
      res = {
        status: 404,
        message: `sites with name ${site.name}, does not exist`,
      };
    } else {
      try {
        await this.sitesRepository.save({ ...siteToUpdate, ...site });
        res = {
          status: 200,
          message: `L'utilisateur a été mis à jours`,
        };
      } catch (e) {
        res = {
          status: 500,
          message: `Problème lors de la mise à jours`,
        };
      }
    }
    return res;
  }
}
