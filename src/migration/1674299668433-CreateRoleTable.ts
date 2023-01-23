import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"
import { DB_TABLE } from "../config/db.table.config";
import { ROLES } from "../config/roles.config";
import { v1 as uuidv1 } from 'uuid';
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
                  name: 'code',
                  type: 'varchar',
                  isNullable: false,
                  isUnique: true,
                  length: '50'
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: true,
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
              name: `IDX_ROLE_CODE`,
              columnNames: ['code']
            })
          );
          
          await queryRunner.createIndex(
            DB_TABLE.ROLE_TABLE,
            new TableIndex({
              name: `IDX_ROLE_UUID`,
              columnNames: ['uuid']
            })
          );

          await queryRunner.query(
            `INSERT INTO  ${DB_TABLE.ROLE_TABLE}  (uuid,code,name,description) VALUES('${uuidv1()}','${ROLES.SUPER_ADMIN_ROLE}','Super Admin Role','Highest Level Role')`,
          );
          await queryRunner.query(
            `INSERT INTO  ${DB_TABLE.ROLE_TABLE}  (uuid,code,name,description) VALUES('${uuidv1()}','${ROLES.ADMIN_ROLE}','Admin Role','Admin Level Role')`,
          );  
          await queryRunner.query(
            `INSERT INTO  ${DB_TABLE.ROLE_TABLE}  (uuid,code,name,description) VALUES('${uuidv1()}','${ROLES.MANAGER_ROLE}','Manager Role','Manager Role')`,
          );  
          await queryRunner.query(
            `INSERT INTO  ${DB_TABLE.ROLE_TABLE}  (uuid,code,name,description) VALUES('${uuidv1()}','${ROLES.USER_ROLE}','User Role','User Role')`,
          );   
          await queryRunner.query(
            `INSERT INTO  ${DB_TABLE.ROLE_TABLE}  (uuid,code,name,description) VALUES('${uuidv1()}','${ROLES.ANONYMOUS_ROLE}','Anomymous Role','Anomymous Role')`,
          );            

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
