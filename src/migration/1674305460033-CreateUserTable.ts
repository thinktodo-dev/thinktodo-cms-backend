import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"
import { DB_TABLE } from "../config/db.table.config";
import { v1 as uuidv1 } from 'uuid';

export class CreateUserTable1674305460033 implements MigrationInterface {
    indexFields = ['id','name', 'email', 'username','country_code','mobile'];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: DB_TABLE.USER_TABLE,
            columns: [
            {
                name: "id",
                type: "varchar",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "uuid"
            },
            {
                name: 'username',
                type: 'varchar',
                isNullable: false,
                isUnique: true,
                length: '255'
            },
            {
                name: 'password',
                type: 'varchar',
                isNullable: true,
                length: '255'
            },
            {
                name: 'type_account',
                type: 'varchar',
                isNullable: false,
                length: '25',
                default: `'email'`,
                comment:`'email or phone, facebook, apple, linkedin, google'`
            },            
            {
                name: 'email',
                type: 'varchar',
                isNullable: true,
                length: '150'
            },
            {
                name: 'name',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'mobile',
                type: 'varchar',
                isNullable: true,
                length: '15'
            },
            {
                name: 'country_code',
                type: 'varchar',
                isNullable: true,
                length: '3'
            },
            {
                name: 'status',
                type: 'varchar',
                default: `'active'`
            },
            {
                name: 'role_code',
                type: 'varchar',
                isNullable: true,
                length: '50'
            },
            {
                name: 'salt',
                type: 'varchar',
                isNullable: true,
                length: '30'
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

        for (const field of this.indexFields) {
            await queryRunner.createIndex(
                DB_TABLE.USER_TABLE,
              new TableIndex({
                name: `IDX_USER_${field.toUpperCase()}`,
                columnNames: [field]
              })
            );
        }

        await queryRunner.createForeignKey(
            DB_TABLE.USER_TABLE,
            new TableForeignKey({
              columnNames: ['role_code'],
              referencedColumnNames: ['code'],
              referencedTableName: DB_TABLE.ROLE_TABLE,
              onDelete: 'CASCADE'
            })
          );

          await queryRunner.query(
            `INSERT INTO  ${DB_TABLE.USER_TABLE} (id,username, password, type_account, email, name, country_code, status, role_code,salt) VALUES ('${uuidv1()}','admin', '$2b$10$Lh3Npo0sZ/R9AHBIy/t5e.0.atj6ujgRtEg8tvXlxveVG8iXvaY1m', 'email', 'support@thinktodo.net', 'Admin', 'vn', 'active', 'super-admin','$2b$10$Lh3Npo0sZ/R9AHBIy/t5e.')`
          );             

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}


