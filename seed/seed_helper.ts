/* tslint:disable no-console */
import { Connection, createConnection, Entity } from 'typeorm';
import * as OrmConfig from '../ormconfig';

export async function cleanTable(
  connection: Connection,
  entity: any,
): Promise<any> {
  return await connection
    .createQueryBuilder()
    .delete()
    .from(entity)
    .execute();
}

export async function addEntities(
  connection: Connection,
  entity: any,
  entities: Array<any>,
): Promise<any> {
  await connection
    .createQueryBuilder()
    .insert()
    .into(entity)
    .values(entities)
    .execute();
  console.log('Seed Executed with success', entities);
  return connection;
}

export async function connect() {
  return createConnection(OrmConfig as any);
}
