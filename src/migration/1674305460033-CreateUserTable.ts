import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { DB_TABLE } from "../config/db-table";

export class CreateUserTable1674305460033 implements MigrationInterface {
    indexFields = ['name', 'email', 'username','country_code','mobile'];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: DB_TABLE.USER_TABLE,
            columns: [
            {
                name: "uuid",
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
                isNullable: true
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
                name: 'address',
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
