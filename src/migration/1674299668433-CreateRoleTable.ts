import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"
import { DB_TABLE } from "../config/db-table";
export class CreateRoleTable1674299668433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: DB_TABLE.ROLE_TABLE,
              columns: [
                {
                    name: "uuid",
                    type: "varchar",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: false,
                  isUnique: true,
                  length: '100'
                },
                {
                  name: 'description',
                  type: 'text'
                },
                {
                    name: "created",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: true,
                },
                {
                    name: "updated",
                    type: "timestamp",
                    isNullable: true,
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                }
              ]
            }),
            true
          );

          await queryRunner.createIndex(
            DB_TABLE.ROLE_TABLE,
            new TableIndex({
              name: `IDX_ROLE_NAME`,
              columnNames: ['name']
            })
          );
          
          await queryRunner.createIndex(
            DB_TABLE.ROLE_TABLE,
            new TableIndex({
              name: `IDX_ROLE_UUID`,
              columnNames: ['uuid']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
