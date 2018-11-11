const fs = require('fs');
const options = require('./ormconfig.js');

const timeStamp = Date.now();
const content = `
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ${process.argv[2]}${timeStamp} implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
  }

  async down(queryRunner: QueryRunner): Promise<any> {
  }
}`;

fs.appendFile(
  `${options.cli.migrationsDir}/${timeStamp}-${process.argv[2]}.ts`,
  content,
  err => {
    if (err) throw err;
    console.log(
      `Created migration: ${options.cli.migrationsDir}/${timeStamp}-${
        process.argv[2]
      }.ts`,
    );
  },
);
