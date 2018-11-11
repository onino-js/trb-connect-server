import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const makeTable = tableName => {
  return new Table({
    name: tableName,
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'firtsName',
        type: 'varchar',
      },
      {
        name: 'lastName',
        type: 'varchar',
      },
      {
        name: 'email',
        type: 'varchar',
      },
      {
        name: 'password',
        type: 'varchar',
      },
    ],
  });
};

export class users1541321790390 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(makeTable('users'), true);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
