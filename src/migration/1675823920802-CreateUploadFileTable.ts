import { DB_TABLE } from "../config/db.table.config";
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUploadFileTable1675823920802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: DB_TABLE.UPLOAD_FILE,
              columns: [
                {
                    name: "id",
                    type: "int",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                  name: "name",
                  type: "varchar(255)",
                  isNullable: false,
                },
                {
                    name: "alternative_text",
                    type: "varchar(255)",
                    isNullable: true,
                },
                {
                    name: "caption",
                    type: "varchar(255)",
                    isNullable: true,
                },
                {
                    name: "width",
                    type: "int",
                    isNullable: true,
                }, 
                {
                    name: "height",
                    type: "int",
                    isNullable: true,
                },                
                {
                    name: "formats",
                    type: "longtext",
                    isNullable: true,
                },
                {
                    name: "hash",
                    type: "varchar(255)",
                    isNullable: false,
                },
                {
                    name: "ext",
                    type: "varchar(255)",
                    isNullable: true,
                },
                {
                    name: "mime",
                    type: "varchar(255)",
                    isNullable: false,
                },
                {
                    name: "size",
                    type: "decimal(10,2)",
                    isNullable: false,
                },
                {
                    name: "url",
                    type: "varchar(255)",
                    isNullable: false,
                },
                {
                    name: "preview_url",
                    type: "varchar(255)",
                    isNullable: true,
                },
                {
                    name: "provider",
                    type: "varchar(255)",
                    isNullable: false,
                },   
                {
                    name: "provider_metadata",
                    type: "longtext",
                    isNullable: true,
                },     
                {
                    name: "create_by",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "update_by",
                    type: "int",
                    isNullable: true,
                },                                    
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                  isNullable: true,
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  isNullable: true,
                  default: "CURRENT_TIMESTAMP",
                  onUpdate: "CURRENT_TIMESTAMP",
                }
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
