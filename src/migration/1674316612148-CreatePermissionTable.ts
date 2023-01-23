import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { DB_TABLE } from "../config/db.table.config";

export class CreatePermissionTable1674316612148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: DB_TABLE.PERMISSION_TABLE,
              columns: [
                {
                    name: "uuid",
                    type: "varchar",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                  name: 'module',
                  type: 'varchar',
                  length: '100'
                },
                {
                  name: 'path',
                  type: 'varchar',
                  length: '255',
                  isNullable: false
                },
                {
                  name: 'description',
                  type: 'text',
                  isNullable: true,
                },
                {
                  name: 'method',
                  type: 'varchar',
                  default: `'get'`,
                  length: '20'
                },
                {
                  name: 'canAccess',
                  type: 'boolean',
                  default: false
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
