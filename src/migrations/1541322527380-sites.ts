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
        name: 'name',
        type: 'varchar',
      },
    ],
  });
};

export class sites1541321140055 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(makeTable('sites'), true);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('sites');
  }
}
