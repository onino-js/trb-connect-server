import { UserEntity } from './../src/users/users.entity';
import { ProbeEntity } from './../src/probes/probes.entity';
import { SiteEntity } from './../src/sites/sites.entity';
import { MeasureEntity } from './../src/measures/measures.entity';
const sites = require('./json/sites.json');
import probes from './json/probes';
const users = require('./json/users.json');

export const sites_seed_runner = async connection => {
  const siteRepository = connection.getRepository(SiteEntity);
  const probeRepository = connection.getRepository(ProbeEntity);
  const measureRepository = connection.getRepository(MeasureEntity);
  const userRepository = connection.getRepository(UserEntity);

  // console.log('start creating sites');
  // for (let i = 0; i < sites.length; i++) {
  //   let site = new SiteEntity();
  //   Object.assign(site, sites[i]);
  //   await siteRepository.save(site);
  // }

  console.log('creating users');
  for (let i = 0; i < users.length; i++) {
    let user = new UserEntity();
    Object.assign(user, users[i]);
    await userRepository.save(user);
  }

  console.log('sites are saved in db');
  for (let i = 0; i < probes.length; i++) {
    let probe = new ProbeEntity();
    let site = await siteRepository.findOne({ name: probes[i].site });
    probe.name = probes[i].name;
    probe.value = probes[i].value;
    probe.site = site;
    probe.dateTime = new Date();
    await probeRepository.save(probe);
  }
  console.log('probes are saved in db');

  // for (let i = 0; i < 100; i++) {
  //   const value =
  //     Math.round((Math.random() + 0.5) * 10) *
  //     10 *
  //     (Math.round(Math.cos(i)) + 1);
  //   let newDate = new Date();
  //   newDate.setSeconds(newDate.getSeconds() + i * 60 * 5);
  //   const dbProbes = await probeRepository.find({
  //     relations: ['site'],
  //   });
  //   for (let n = 0; n < dbProbes.length; n++) {
  //     let measure = new MeasureEntity();
  //     measure.value = value;
  //     measure.dateTime = newDate;
  //     measure.probe = dbProbes[n];
  //     measure.site = dbProbes[n].site;

  //     await measureRepository.save(measure);
  //   }
  // }
  // console.log('measures are saved in db');
};
