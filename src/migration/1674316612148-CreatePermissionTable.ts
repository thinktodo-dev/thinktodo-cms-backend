import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"
import { DB_TABLE } from "../config/db.table.config";

export class CreatePermissionTable1674316612148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: DB_TABLE.PERMISSION_TABLE,
              columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                  name: 'role_id',
                  type: "varchar",
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
          
          await queryRunner.createForeignKey(
            DB_TABLE.PERMISSION_TABLE,
          new TableForeignKey({
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName:DB_TABLE.ROLE_TABLE,
            onDelete: 'CASCADE'
          })
        );

          await queryRunner.createIndex(
            DB_TABLE.PERMISSION_TABLE,
            new TableIndex({
              name: `IDX_PERMISSION_ID`,
              columnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
