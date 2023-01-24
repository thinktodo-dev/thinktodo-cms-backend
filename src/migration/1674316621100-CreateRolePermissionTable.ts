import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"
import { DB_TABLE } from "../config/db.table.config";

export class CreateRolePermissionTable1674316621100 implements MigrationInterface {
    foreignKeysArray = [
        {
          field: 'role_id',            
          table: 'role',
          reference: 'id'
        },
        {
          field: 'permission_id',            
          table: 'permission',
          reference: 'id'
        }
      ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: DB_TABLE.ROLE_PERMISSION_TABLE,
              columns: [
                {
                  name: 'role_id',
                  type: "varchar",
                  generationStrategy: "uuid",
                  isPrimary: true
                },
                {
                    name: 'permission_id',
                    type: "varchar",
                    generationStrategy: "uuid",
                    isPrimary: true
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
            false
          );
          for (const foreignKey of this.foreignKeysArray) {
            await queryRunner.createForeignKey(
                DB_TABLE.ROLE_PERMISSION_TABLE,
              new TableForeignKey({
                columnNames: [foreignKey.field],
                referencedColumnNames: [foreignKey.reference],
                referencedTableName: foreignKey.table,
                onDelete: 'CASCADE'
              })
            );
          }       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
