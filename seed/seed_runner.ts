/* tslint:disable no-var-requires */
import { MeasureEntity } from './../src/measures/measures.entity';
import { ProbeEntity } from './../src/probes/probes.entity';
import { SiteEntity } from './../src/sites/sites.entity';
import { UserEntity } from './../src/users/users.entity';
import { cleanTable, connect } from './seed_helper';
import { sites_seed_runner } from './sites_runner';
export const sites = require('./json/sites.json');
export const users = require('./json/users.json');

export function runSeed() {
  connect().then(
    async connection => {
      console.warn('clean tables');
      await cleanTable(connection, MeasureEntity);
      console.warn('measures cleaned');
      await cleanTable(connection, ProbeEntity);
      console.warn('probes cleaned');
      await cleanTable(connection, SiteEntity);
      console.warn('sites cleaned');
      await cleanTable(connection, UserEntity);
      console.warn('users cleaned');
      console.warn('add user entities');
      // await addEntities(connection, UserEntity, users);
      await sites_seed_runner(connection);
      process.exit();
    },
    error => {
      console.log(error);
    },
  );
}

runSeed();
